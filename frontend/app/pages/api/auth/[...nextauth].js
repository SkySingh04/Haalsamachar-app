// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g., 'Sign in with Email')
      name: 'Sign In With Username',
      // Authenticate using email and password from your Go backend
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Call your Go backend to authenticate the user
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        });
        const user = await res.json();
        if (user) {
          // If authentication is successful, return the user object
          return Promise.resolve(user);
        } else {
          // If authentication fails, return null
          return Promise.resolve(null);
        }
      }
    })
  ],
  // Configure session settings, callbacks, etc.
});
