'use server'
import React from 'react';
import { auth } from "@/auth"
import Header from '../components/Header';

const Page = async () => {
      const session = await auth()
      console.log('session');
      console.log(session);
      const name = session?.user?.email ?? '';
      console.log('name', name);
    
  return (
    <div>
      <Header 
        bgImage='/createpost.jpg'
        heading='Create Post'
        subheading='Create a new post to share with the world.'
      />
        <p>Welcome {session?.user?.email}!</p>
    </div>
  );
};

export default Page;
