import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isCreatePostPage = nextUrl.pathname === '/createpost';
      const isLoginPage = nextUrl.pathname === '/login';
      const isSignUpPage = nextUrl.pathname === '/signup';
      console.log('isLoggedIn', isLoggedIn);
      if (isCreatePostPage && !isLoggedIn) {
        return false;
      }
      else if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/createpost', nextUrl));
      }
      else if (isSignUpPage && isLoggedIn) {
        return Response.redirect(new URL('/createpost', nextUrl));
      }
      return true;

    },
  },
  
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;