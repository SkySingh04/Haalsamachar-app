'use server'
import { signIn ,  signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
 
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