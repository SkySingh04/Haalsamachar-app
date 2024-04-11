"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";



const blogsAPI = process.env.NEXT_PUBLIC_BLOGS_API_URL;
const usersAPI = process.env.NEXT_PUBLIC_USERS_API_URL;

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userEmail = user.email;
        const userId = await fetch(`${usersAPI}/users/email/${userEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await userId.json();
        console.log("data", data);
        const userid = data.ID;
        setUserId(userid);
      } else {
        router.push("/login");
      }
    });
  }, [auth]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const image = formData.get("image");
    const content = e.target.content.value;
    console.log("content", content);
    const userIdNum =  parseInt(userId);
    const blog = {
      userId: userIdNum,
      title: title,
      content: content,
      subtitle: subtitle,
      image: image,
    };
    console.log("blog", blog);

    try {
      const response = await fetch(`${blogsAPI}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        throw new Error(data.message);
      }
      console.log("data", data);
      toast.success("Post created successfully");
      // Clear the form inputs
      e.target.reset();
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error("Error creating blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        bgImage="/createpost.jpg"
        heading="Create Post"
        subheading="Create a new post to share with the world."
      />
      <ToastContainer />
      <div className="max-w-3xl mx-auto my-10 rounded-lg p-8 bg-bt-navy">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block font-semibold">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full border border-bt-teal bg-bt-peach text-bt-navy rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="subtitle" className="block font-semibold">
              Subtitle:
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              className="w-full border border-bt-teal bg-bt-peach text-bt-navy rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block font-semibold">
              Image URL:
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="w-full border border-bt-teal bg-bt-peach text-bt-navy rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block font-semibold">
              Content:
            </label>
            <SimpleMDE
              id="content"
              className="w-full border border-bt-teal bg-bt-peach text-bt-navy rounded-md px-4 py-2"
            />
          </div>
          {loading ? (
            <div className="flex justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Create Post
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default CreatePost;
