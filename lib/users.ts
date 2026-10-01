import { neon } from '@neondatabase/serverless';

export type OwnerAccount = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
};

function getSql() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Provision Neon on Vercel and run `vercel env pull .env.local`.');
  }

  return neon(connectionString);
}

export async function getUserByEmail(email: string): Promise<OwnerAccount | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, email, password_hash
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  const row = rows[0];

  if (!row) {
    return null;
  }

  return {
    id: Number(row.id),
    name: String(row.name),
    email: String(row.email),
    passwordHash: String(row.password_hash),
  };
}
