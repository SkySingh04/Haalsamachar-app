'use server'
import React from 'react';
import Header from '../components/Header';
import { auth } from "@/auth"

// import { useRouter } from 'next/router';
// import { createBlogPost } from '@/api'; // Assuming you have an API function to create a blog post

const CreatePostPage = async () => {
  // const router = useRouter();
  const session = await auth()
  console.log(session);
  const name = session?.user?.email ?? '';
  console.log('name', name);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const subtitle = formData.get('subtitle');
    const image = formData.get('image');
    const content = formData.get('content');

    const userId  = get

    // const blog = {
    //   UserId: session?.user?.id,
    //   Tit
    // req.UserID, req.Title, req.Content, req.Subtitle, req.Image

    // try {
    //   // Call the API function to create the blog post
    //   await createBlogPost({ title, subtitle, image, content });
    //   // Redirect the user to the homepage or wherever you want after successful creation
    //   router.push('/');
    // } catch (error) {
    //   console.error('Error creating blog post:', error);
    //   // Handle error if needed
    // }
  };

  return (
    <>
      <Header
        bgImage='/createpost.jpg'
        heading='Create Post'
        subheading='Create a new post to share with the world.'
      />
      <div className="max-w-3xl mx-auto my-10 rounded-lg p-8 bg-bt-navy">
        <form className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-semibold">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full border border-bt-teal bg-bt-peach text-bt-navy rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="subtitle" className="block font-semibold">Subtitle:</label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              className="w-full border border-bt-teal bg-bt-peach text-bt-navy rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block font-semibold">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              className="w-full border border-bt-teal bg-bt-peach text-bt-navy rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block font-semibold">Content:</label>
            <textarea
              id="content"
              name="content"
              className="w-full border border-bt-teal bg-bt-peach text-bt-navy rounded-md px-4 py-2 h-32"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Create Post</button>
        </form>
      </div>
    </>

  );
};

export default CreatePostPage;
