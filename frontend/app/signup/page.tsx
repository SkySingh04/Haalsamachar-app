'use client'
import React, { useState } from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import {auth } from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
const usersAPI = process.env.NEXT_PUBLIC_USERS_API_URL;

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${usersAPI}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const user = await response.json();
        console.log('User created in postgres');
        try{
          const userCredential: any = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          ).then((userCredential) => {
            const user = userCredential.user;
            console.log('User created in firebase');
          }
          );
        }
        catch (error) {
          console.error('Error:', error);
          toast.error('Failed to SignUp : ' + error);
          throw error;
        }
        toast.success("Sign Up Successful!")
        router.push('/login')
      } 
      else {
        console.error('Failed to create user');
        toast.error('Failed to SignUp');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to SignUp : ' + error);
    }
  };

  return (
    <div>
      <Header
        bgImage="/signup.jpeg"
        heading="Signup"
        subheading="Signup to write beautiful blogs."
      />
      <div className="max-w-md mx-auto mt-8 p-6 bg-bt-navy text-bt-peach shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Signup</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-bt-peach">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="text-bt-navy p-4 text-lg h-8 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-bt-peach">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="text-bt-navy p-4 text-lg h-8 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-bt-peach">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="text-bt-navy p-4 text-lg h-8 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
