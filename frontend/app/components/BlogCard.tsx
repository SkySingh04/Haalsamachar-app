import React from "react";
import localFont from "@next/font/local"
const against = localFont({
  src: "../../public/fonts/Against.ttf",
  variable: "--Against",
})
interface BlogCardProps {
  blog: {
    title: string;
    description: string;
    author: string;
    date: string;
    image: string;
    content: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="px-4 flex  flex-col items-left text-left mx-auto">
      <h2 className={`${against.className} text-5xl mt-4 text-left text-bt-teal`}>{blog.title}</h2>
      <p className="text-bt-sage mt-2 text-xl">{blog.description}</p>
      <div className="flex items-center mt-4">
        <p className="text-bt-teal mr-2  text-lg " >{blog.author}</p>
        <p className="text-bt-sage text-lg ">{blog.date}</p>
      </div>
    </div>
  );
};

export default BlogCard;