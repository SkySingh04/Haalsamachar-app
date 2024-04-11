"use client";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
const commentsAPI = process.env.NEXT_PUBLIC_COMMENTS_API_URL;

const Comments = ({ blogId }: { blogId: Number }) => {
  const [comments, setComments] = useState([{}]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${commentsAPI}/blogs/${blogId}/comments`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      console.log("Comments", data);
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <div className="my-4">
          <div className="space-y-4">
            {comments.length === 0 && <p>No comments yet</p>}
            {comments.map((comment: any) => (
              <div key={comment.id} className="p-4 rounded shadow m-4 border border-bt-navy">
                <Markdown>{comment.content}</Markdown>
                <p className="text-gray-500 text-sm mt-2">
                </p>
              </div>
            ))}
          </div>
        </div>
      );
};

export default Comments;
