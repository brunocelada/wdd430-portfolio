import "server-only";

import { sql } from "@vercel/postgres";

export interface OwnerUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

export async function getUserByEmail(
  email: string,
): Promise<OwnerUser | null> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    return null;
  }

  const { rows } = await sql<OwnerUser>`
    SELECT
      id::text AS id,
      name,
      email,
      password_hash AS "passwordHash"
    FROM users
    WHERE email = ${normalizedEmail}
    LIMIT 1
  `;

  return rows[0] ?? null;
}