import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { create } from 'zustand'

export const useStore = create((set) => ({
    currentUser: undefined, // Add currentUser property
    setCurrentUser: (user:any) => set({ currentUser: user }), // Add setCurrentUser function
}))

const authURL = process.env.NEXT_PUBLIC_AUTH_API_URL;



type User = {
    email: string;
    username: string;
    password: string;
    token: string;
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials , req) {
            const parsedCredentials = {
                username : credentials.username as string,
                password : credentials.password as string,
            };
            const response = await fetch(`${authURL}/api/auth/login`, { 
                method: 'POST',
                body: JSON.stringify(parsedCredentials),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                return null;
            }
            const data = await response.json();
            if (!data.token) {
                return null;
            } else {
                const user: User = {
                    email: credentials.username as string,
                    username: credentials.username as string,
                    password: credentials.password as string,
                    token : data.token
                };
                useStore.setState({currentUser: user});
                console.log(user);
                return user;
            }
        }
    })],
});
