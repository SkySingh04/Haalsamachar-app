'use server'
import { signIn ,  signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
 
export async function authenticate(
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    console.log('redirecting to /createpost');
    redirect("/createpost")
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signout() {
  await signOut();
}

export async function getAuth() {
  const session = await auth();
  return session;
}

export async function createBlogPost(blog: any) {
  const response = await fetch('https://haalsamachar-users.onrender.com/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });
  const data = await response.json();
  return data;
}