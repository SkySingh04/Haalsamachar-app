import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
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
      
      return true;
    },
  },
  
  providers: [], // Add providers with an empty array for now
};
