'use client'
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { usePathname } from 'next/navigation'
import Comments from '../../components/Comments'
import CommentForm from '../../components/CommentForm'
import Markdown from 'react-markdown'


const usersAPI = process.env.NEXT_PUBLIC_USERS_API_URL;
const blogsAPI = process.env.NEXT_PUBLIC_BLOGS_API_URL;

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month} ${year}`;
};
const getUserById = async (id: number) => {
  const response = await fetch(`${usersAPI}/users/${id}`);
  const data = await response.json();
  return data;
}
const Page = () => {
  
  const pathname = usePathname();
  const blogid = pathname.split('/').pop();
  console.log(pathname);
  const [blog, setBlog] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${blogsAPI}/blogs/${blogid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        const data = await response.json();
        console.log(data);
        setBlog(data);
        setUserId(data.user_id);
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
    return <div>
      <Header bgImage='' heading='Loading' subheading='' ></Header>
      </div>;
  }

  const formattedDate = formatDate(blog.created_at);

  return (
    <div>
      <Header bgImage={blog.image} heading={blog.title} subheading={blog.subtitle} />
      <div className="container mt-12 mx-auto p-4 px-10 border-x-4 flex justify-center flex-col items-center border-bt-navy">
        <Markdown className="text-center text-2xl ">{blog.content}</Markdown>
        <div className="flex items-center justify-end text-right mt-4 flex-col">
          <p className="text-bt-teal">Written By: {user?.Username}</p>
          <p className="text-bt-teal">Published On: {formattedDate}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl text-bt-peach">Comments</h2>
          <Comments blogId={blog.id} />
          <CommentForm blogId={blog.id} userId={userId} />
          </div>
      </div>
    </div>
  );
  
};

export default Page;
