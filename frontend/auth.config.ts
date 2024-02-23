import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log('isLoggedIn', isLoggedIn);
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isLoginPage = nextUrl.pathname === '/login';
  
      if (isOnDashboard) {
        // Redirect unauthenticated users to login page
        if (!isLoggedIn) return false;
      } else if (isLoggedIn && isLoginPage) {
        // Don't redirect if user is logged in and accessing login page
        return true;
      } else if (!isLoggedIn && !isLoginPage) {
        // Redirect unauthenticated users to login page for other pages
        return false;
      }
  
      // Allow access for authenticated users or login page
      return true;
    },
  },
  
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;