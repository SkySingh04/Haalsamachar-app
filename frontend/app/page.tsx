'use client'
import Header from "./components/Header";
import BlogCard from "./components/BlogCard";
import { useEffect  , useState} from "react";
import Link from "next/link";


export default function Home() {

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://haalsamachar-users.onrender.com/blogs');
      const data = await response.json();
      console.log(data);
      setBlogs(data);
    };
    fetchData();
  }, []);


  return (
    <div className="sage">
      <Header bgImage="./homebg.jpg" />
      <div className="grid grid-cols-1 gap-4 text-left mt-14">
        {blogs.map((blog, index) => (
          <>
          <BlogCard key={index} blog={blog} />
          <hr className="border-b-2 border-bt-navy  m-10 w-[600px] mx-auto " />
          </>
        ))}
      </div>
      <div className="flex justify-end mx-20 my-4">
      <Link  href="/createpost" className="bg-bt-navy text-bt-peach p-4 w-[150px] rounded hover:bg-bt-teal text-center ">Create Post</Link>
      </div>
    </div>
  );
}
