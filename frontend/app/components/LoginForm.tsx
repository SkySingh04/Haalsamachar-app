'use client'
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../lib/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import {useRouter} from 'next/navigation';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true
    const formData = new FormData(event.target); // Get form data
    try {
      await authenticate(formData); // Authenticate user
      toast.success('Logged in successfully!'); // Show success message
      router.push('/createpost'); // Redirect to create post page (if authentication is successful
    } catch (error: any) {
      setErrorMessage(error.message); // Set error message if authentication fails
      toast.error(error.message); // Show error message
    }
    setLoading(false); // Set loading state back to false
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-bt-navy px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl text-bt-peach">Log In</h1>
        <div className="w-full">
          <ToastContainer />
          <div>
            <div className="relative">
              <input
                className="peer text-bt-navy block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                name="username"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <input
                className="peer text-bt-navy block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
        </div>
        <LoginButton loading={loading} />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              {toast.error(errorMessage)}
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      className={`mt-4 w-full bg-bt-teal hover:bg-bt-sage text-white py-2 rounded-md transition duration-300`}
      disabled={loading}
    >
      {loading ? 'Logging in...' : 'Log in'}
    </button>
  );
}
