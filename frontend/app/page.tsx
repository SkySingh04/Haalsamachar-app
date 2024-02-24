'use client'
import Header from "./components/Header";
import BlogCard from "./components/BlogCard";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://haalsamachar-users.onrender.com/blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="sage">
      <Header
        bgImage="./homebg.jpg"
        heading="HaalSamachar"
        subheading="Just to keep a check on your HaalSamachar"
      />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-bt-peach"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 justify-center mt-14">
          {blogs.map((blog, index) => (
            <>
              <BlogCard key={index} blog={blog} />
              <hr className="border-b-2 border-bt-navy m-10 w-[600px] mx-auto " />
            </>
          ))}
        </div>
      )}
      <div className="flex justify-end mx-20 my-4">
        <Link href="/createpost" className="bg-bt-navy text-bt-peach p-4 w-[150px] rounded hover:bg-bt-teal text-center">Create Post</Link>
      </div>
    </div>
  );
}
