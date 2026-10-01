import { readFileSync } from 'node:fs';

import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';

const text = readFileSync('.env.local', 'utf8');
const env = {};

for (const line of text.split(/\r?\n/)) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (!match) continue;
  env[match[1].trim()] = match[2].trim();
}

console.log('keys', Object.keys(env).join(','));

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

const email = unquote(env.OWNER_EMAIL ?? '');
const password = unquote(env.OWNER_PASSWORD ?? '');
console.log('emailLength', email.length);
console.log('emailLooksValid', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
console.log('passwordLength', password.length);

const sql = neon(env.DATABASE_URL);
const rows = await sql`SELECT email, password_hash FROM users`;
console.log('userCount', rows.length);

for (const row of rows) {
  const stored = String(row.password_hash);
  const sameEmail = String(row.email) === email;
  const match = bcrypt.compareSync(password, stored);
  console.log(
    'sameEmail',
    sameEmail,
    'passwordMatch',
    match,
    'hashLength',
    stored.length,
    'prefix',
    stored.slice(0, 7),
    'dollarCount',
    (stored.match(/\$/g) ?? []).length,
  );
}
