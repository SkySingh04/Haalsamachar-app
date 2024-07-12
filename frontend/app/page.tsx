'use client'
import Header from "./components/Header";
import BlogCard from "./components/BlogCard";
import { useEffect, useState } from "react";
import Link from "next/link";

const usersAPI = process.env.NEXT_PUBLIC_USERS_API_URL;
const blogsAPI = process.env.NEXT_PUBLIC_BLOGS_API_URL;

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${usersAPI}/blogs`);
        const blogsData = await response.json();
        const blogsWithCategories = await Promise.all(
          blogsData.map(async (blog : any) => {
            const categoriesResponse = await fetch(`${blogsAPI}/blogs/${blog.id}/categories`);
            const categoriesData = await categoriesResponse.json();
            return { ...blog, categories: categoriesData };
          })
        );
        setBlogs(blogsWithCategories);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${blogsAPI}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchBlogs();
    fetchCategories();
  }, []);

  const filteredBlogs = selectedCategory
    ? blogs.filter(blog => blog.categories.some((category : any) => category.id === selectedCategory.id))
    : blogs;

  return (
    <div className="sage">
      <Header
        bgImage="./homebg.jpg"
        heading="HaalSamachar"
        subheading="Aur batao, Kya Haal Samachar?"
      />
      <div className="flex justify-center mt-10">
        <select
          value={selectedCategory ? selectedCategory.id : ''}
          onChange={(e) => {
            const selectedId = e.target.value;
            const category = categories.find((cat : any) => cat.id.toString() === selectedId);
            setSelectedCategory(category);
          }}
          className="p-2 border bg-bt-navy text-bt-peach rounded "
        >
          <option value="">All Categories</option>
          {categories.map((category:any) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-bt-peach"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 justify-center mt-14">
          {filteredBlogs.map((blog, index) => (
            <div key={index}>
              <BlogCard blog={blog} />
              <div className="text-center mt-4">
                {blog.categories.map((category: any) => (
                  <span key={category.id} className="bg-bt-navy text-bt-peach px-2 py-1 rounded-full m-1 inline-block">
                    {category.name}
                  </span>
                ))}
              </div>
              <hr className="border-b-2 border-bt-navy m-10 w-[600px] mx-auto " />
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-end mx-20 my-4">
        <Link href={`/createpost/new`} className="bg-bt-navy text-bt-peach p-4 w-[150px] rounded hover:bg-bt-teal text-center">Create Post</Link>
      </div>
    </div>
  );
}
