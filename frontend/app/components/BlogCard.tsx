'use client'
import React, { useState  , useEffect} from "react";
import localFont from "@next/font/local"
import Link from "next/link";
import Likes from "./Likes";
import { auth } from "../firebase";
import {  onAuthStateChanged } from "firebase/auth";
import DeleteDialogueBox from "../components/DeleteDialogueBox";
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

  const [author, setAuthor] = useState<User | null>(null);
  const [isVisibleLikes, setIsVisibleLikes] = useState(true);
  const [isVisibleDeleteButton, setIsVisibleDeleteButton] = useState(true);
  const [loggedInUserId, setLoggedInUserId] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  const openDelete = () => {
    setIsVisible(true);
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("User not logged in");
        setIsVisibleLikes(false);
        setIsVisibleDeleteButton(false);
      }
     else{
      console.log("User logged in");
      try{
      const userEmail = user.email;
        const userId = await fetch(`${userAPI}/users/email/${userEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await userId.json();
        const userid = data.ID;
        setLoggedInUserId(userid);
      
      setIsVisibleLikes(true);
      setIsVisibleDeleteButton(true);
      } catch (error) {
        console.error(error);
      }
     } 
    });
  } , [auth]) 
  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserById(blog.user_id);
      setAuthor(user);
    };
    fetchData();
  }, [blog.user_id]);

  const formattedDate = formatDate(blog.created_at);
  return (
    
      <div className="px-4 flex flex-col items-center mx-auto">
      {isVisible && <DeleteDialogueBox
            blogId={blog.id.toString()}
            userId={loggedInUserId}
            isBlog={true}
            onClose={() => setIsVisible(false)}
           />}
           <Link href={`/blogs/${blog.id}`} className="flex flex-col items-center mx-auto">
        <h2 className={`${against.className} text-2xl mt-4 text-left text-bt-teal sm:text-2xl md:text-3xl lg:text-4xl`}>{blog.title}</h2>
        <p className="text-bt-sage mt-2 text-xl sm:text-xl md:text-2xl lg:text-3xl">{blog.subtitle}</p>
        </Link>
        <div className="flex items-center mt-4">
          <p className="text-bt-teal mr-2 text-lg sm:text-l md:text-xl lg:text-2xl">Written By: {author?.Username} | </p>
          <p className="text-bt-sage text-lg sm:text-l md:text-xl lg:text-2xl">{formattedDate}</p>
          
        </div>
        <div className="flex items-center">
            {isVisibleLikes && <Likes id={blog.id} />}
            {isVisibleDeleteButton && (
              <svg
                onClick={openDelete}
                className="w-12 h-12 text-red-400 cursor-pointer ml-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
      </div>
  );
};

export default BlogCard;