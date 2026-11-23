
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { authConfig } from "./auth.config";
import { getUserByEmail } from "@/lib/users-db";

const credentialsSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .transform((email) => email.toLowerCase()),
  password: z.string().min(8),
});

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await getUserByEmail(email);

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          password,
          user.passwordHash,
        );

        if (!passwordsMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
});
