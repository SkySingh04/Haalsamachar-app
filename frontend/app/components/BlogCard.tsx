'use client'
import React, { useState } from "react";
import localFont from "@next/font/local"
import Link from "next/link";
import Likes from "./Likes";
const against = localFont({
  src: "../../public/fonts/Against.ttf",
  variable: "--Against",
})

const userAPI = process.env.NEXT_PUBLIC_USERS_API_URL;

interface BlogCardProps {
  blog: {
    id : number;
    title: string;
    subtitle: string;
    user_id: number;
    created_at: string;
    image: string;
    content: string;
  };
}

interface User {
  ID: number;
  Username: string;
  Email: string;
  Password: string;
}

const getUserById = async (id: number) => {
  const response = await fetch(`${userAPI}/users/${id}`);
  const data = await response.json();
  return data;
}


const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month} ${year}`;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {

  const [user, setUser] = useState<User | null>(null);
  
  React.useEffect(() => {
    const fetchData = async () => {
      const user = await getUserById(blog.user_id);
      setUser(user);
    };
    fetchData();
  }, [blog.user_id]);

  const formattedDate = formatDate(blog.created_at);
  return (
    <Link href={`/blogs/${blog.id}`}>
      <div className="px-4 flex flex-col items-center mx-auto">
        <h2 className={`${against.className} text-2xl mt-4 text-left text-bt-teal sm:text-2xl md:text-3xl lg:text-4xl`}>{blog.title}</h2>
        <p className="text-bt-sage mt-2 text-xl sm:text-xl md:text-2xl lg:text-3xl">{blog.subtitle}</p>
        <div className="flex items-center mt-4">
          <p className="text-bt-teal mr-2 text-lg sm:text-l md:text-xl lg:text-2xl">Written By: {user?.Username} | </p>
          <p className="text-bt-sage text-lg sm:text-l md:text-xl lg:text-2xl">{formattedDate}</p>
          
        </div>
        <Likes id={blog.id} />
      </div>
    </Link>
  );
};

export default BlogCard;