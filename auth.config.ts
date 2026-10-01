import type { NextAuthConfig } from 'next-auth';

export function isManagementPath(pathname: string): boolean {
  return pathname === '/meetings/new' || /^\/meetings\/[^/]+\/edit$/.test(pathname);
}

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = isManagementPath(nextUrl.pathname);

      if (isProtected) {
        if (isLoggedIn) return true;
        return false;
      }

      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/meetings/new', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
