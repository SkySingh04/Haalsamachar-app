'use client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import {useRouter} from 'next/navigation';
import {auth} from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";


export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt: any) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true
    const { email, password } = state;
    console.log('email:', email);
    console.log('password', password);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success('Logged in successfully!'); // Show success message
      router.push('/createpost/new'); // Redirect to create post page (if authentication is successful
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
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={handleChange}
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
                onChange={handleChange}
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
