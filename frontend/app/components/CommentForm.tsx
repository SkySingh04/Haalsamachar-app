'use client'
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const commentsAPI = process.env.NEXT_PUBLIC_COMMENTS_API_URL;

const CommentForm = ({
  blogId,
  userId,
}: {
  blogId: Number;
  userId: Number;
}) => {
  const handleSubmit = async (e : any ) => {
    e.preventDefault();
    const content = e.target.content.value;
    const comment = {
      userId: blogId,
      blogId: userId,
      content: content,
    }; //done on purpose because the API has typo 
    console.log("comment", comment);
    const response = await fetch(`${commentsAPI}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }
    );
    if (!response.ok) {
      toast.error("Failed to add comment");
      return;
    }
    toast.success("Comment added successfully");
  };

  return (
    <div>
      <ToastContainer />
      <form className="space-y-4" onSubmit={handleSubmit}>
      <SimpleMDE
        id="content"
        className="w-full border border-bt-teal bg-bt-peach text-bt-navy rounded-md px-4 py-2"
      />
      <button
        type="submit"
        className="bg-bt-navy my-4 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Add Comment
      </button>
    </form>
    </div>
  );
};

export default CommentForm;
