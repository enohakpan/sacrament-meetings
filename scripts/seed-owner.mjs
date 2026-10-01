import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';

function loadEnvLocal() {
  try {
    const text = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');

    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (!match) continue;

      const key = match[1].trim();
      let value = match[2].trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      process.env[key] = value;
    }
  } catch {
    // .env.local is optional when the variables are already in the environment.
  }
}

loadEnvLocal();

const connectionString = process.env.DATABASE_URL;
const email = process.env.OWNER_EMAIL;
const password = process.env.OWNER_PASSWORD;

if (!connectionString) {
  console.error('DATABASE_URL is missing. Provision Neon on Vercel, then run: vercel env pull .env.local');
  process.exit(1);
}

if (!email || !password || password.length < 6) {
  console.error('Set OWNER_EMAIL and OWNER_PASSWORD (at least 6 characters) before seeding the owner account.');
  process.exit(1);
}

const sql = neon(connectionString);
const passwordHash = bcrypt.hashSync(password, 10);

await sql`
  CREATE TABLE IF NOT EXISTS users (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
  )
`;

await sql`
  INSERT INTO users (name, email, password_hash)
  VALUES ('Ward Owner', ${email}, ${passwordHash})
  ON CONFLICT (email) DO UPDATE
  SET name = EXCLUDED.name,
      password_hash = EXCLUDED.password_hash
`;

await sql`DELETE FROM users WHERE email <> ${email}`;

console.log('Owner account is ready. Sign in with OWNER_EMAIL and OWNER_PASSWORD from .env.local.');
