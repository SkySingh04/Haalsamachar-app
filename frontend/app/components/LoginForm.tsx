'use client'
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../lib/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [loading ,  setLoading] = useState(false)
  const { pending } = useFormStatus();
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-bt-navy px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl text-bt-peach">
          Please log in to continue.
        </h1>
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
        <LoginButton loading={loading} setLoading={setLoading} />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              {toast.error(errorMessage)}
              {setLoading(false)}
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton({ loading , setLoading }: { loading: boolean , setLoading: any }) {

  const handleClick =()=>{
    setLoading(true)
  }
  return (
    <button
      className={`mt-4 w-full bg-bt-teal hover:bg-bt-sage text-white py-2 rounded-md transition duration-300`}
      aria-disabled={loading}
      onClick={handleClick}
    >
      {loading ? 'Logging in...' : 'Log in'}
    </button>
  );
}
