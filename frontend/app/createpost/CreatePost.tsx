'use client'
import React, { useState } from 'react';
import Header from '../components/Header';
import { auth } from "@/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = ({ userId }: { userId: any }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const title = formData.get('title');
        const subtitle = formData.get('subtitle');
        const image = formData.get('image');
        const content = formData.get('content');
        const userIdNum = parseInt(userId);
        const blog = {
            userId: userIdNum,
            title: title,
            content: content,
            subtitle: subtitle,
            image: image
        }
        console.log('blog', blog);

        try {
            // Call the API function to create the blog post
            const response = await fetch('https://haalsamachar-blogs.onrender.com/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blog),
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data)
                throw new Error(data.message);
            }
            console.log('data', data);
            toast.success('Post created successfully');
            // Clear the form inputs
            e.target.reset();
        } catch (error) {
            console.error('Error creating blog post:', error);
            toast.error('Error creating blog post');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Header
                bgImage='/createpost.jpg'
                heading='Create Post'
                subheading='Create a new post to share with the world.'
            />
            <ToastContainer />
            <div className="max-w-3xl mx-auto my-10 rounded-lg p-8 bg-bt-navy">
                <form className="space-y-4" onSubmit={handleSubmit} >
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
                    {loading ? (
                        <div className="flex justify-center">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Create Post</button>
                    )}
                </form>
            </div>
        </>

    );
};

export default CreatePost;
