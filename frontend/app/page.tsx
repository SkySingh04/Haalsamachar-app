'use client'
import Header from "./components/Header";
import BlogCard from "./components/BlogCard";
import { useEffect  , useState} from "react";





const blogs = [
  {
    "title": "Blog 1",
    "description": "This is the description of blog 1",
    "author": "Author 1",
    "date": "2022-07-11",
    "image": "https://images.unsplash.com/photo-1634097434540-3a2b9a5f4f5f",
    "content": "This is the content of blog 1"
  }
  , {
    "title": "Blog 2",
    "description": "This is the description of blog 2",
    "author": "Author 2",
    "date": "2022-07-12",
    "image": "https://images.unsplash.com/photo-1634097434540-3a2b9a5f4f5f",
    "content": "This is the content of blog 2"
  }
];
export default function Home() {

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://haalsamachar-users.onrender.com/users/1/blogs');
      const data = await response.json();
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
      <button className="bg-bt-navy text-bt-peach p-4 w-[150px] rounded hover:bg-bt-teal  ">Create Post</button>
      </div>
    </div>
  );
}
