
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const isDashboard =
        pathname === "/dashboard" ||
        pathname.startsWith("/dashboard/");

      if (isDashboard && !isLoggedIn) {
        return false;
      }

      if (isLoggedIn && pathname === "/login") {
        return Response.redirect(
          new URL("/dashboard/projects", nextUrl),
        );
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
