import React from "react";
import localFont from "@next/font/local"
const against = localFont({
  src: "../../public/fonts/Against.ttf",
  variable: "--Against",
})
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

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="px-4 flex  flex-col items-left text-left mx-auto">
      <h2 className={`${against.className} text-5xl mt-4 text-left text-bt-teal`}>{blog.title}</h2>
      <p className="text-bt-sage mt-2 text-xl">{blog.subtitle}</p>
      <div className="flex items-center mt-4">
        <p className="text-bt-teal mr-2  text-lg " >{blog.user_id}</p>
        <p className="text-bt-sage text-lg ">{blog.created_at}</p>
      </div>
    </div>
  );
};

export default BlogCard;