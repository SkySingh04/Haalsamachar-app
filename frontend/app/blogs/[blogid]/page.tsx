'use client'
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { usePathname } from 'next/navigation'

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month} ${year}`;
};
const getUserById = async (id: number) => {
  const response = await fetch(`https://haalsamachar-users.onrender.com/users/${id}`);
  const data = await response.json();
  return data;
}
const Page = () => {
  
  const pathname = usePathname();
  const blogid = pathname.split('/').pop();
  console.log(pathname);
  const [blog, setBlog] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://haalsamachar-blogs.onrender.com/blogs/${blogid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        const data = await response.json();
        console.log(data);
        setBlog(data);
        const user = await getUserById(data.user_id);
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    if (blogid) {
      fetchBlog();
    }
  }, [blogid]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const formattedDate = formatDate(blog.created_at);

  return (
    <div>
      <Header bgImage={blog.image} heading={blog.title} subheading={blog.subtitle} />
    <div className="container mt-12 mx-auto p-4 border-x-4  border-bt-navy">
    <p className="text-2xl text-bt-peach text-center">" {blog.content} "</p>
    <div className="flex items-center justify-end text-right mt-4 flex-col " >
      <p className="text-bt-teal ">Written By: {user?.Username}</p>
      <p className="text-bt-teal ">Published On: {formattedDate}</p>
      </div>
    </div>
    </div>
  );
};

export default Page;
