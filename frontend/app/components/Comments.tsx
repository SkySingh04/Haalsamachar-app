"use client";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Likes from "./Likes";
import DeleteDialogueBox from "./DeleteDialogueBox";

const commentsAPI = process.env.NEXT_PUBLIC_COMMENTS_API_URL;

const Comments = ({
  blogId,
  isVisibleLikes,
  isVisibleDeleteButton,
  loggedInUserId
}: {
  blogId: Number;
  isVisibleLikes: Boolean;
  isVisibleDeleteButton: Boolean;
  loggedInUserId: string;
}) => {
  const [comments, setComments] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const openDelete = () => {
    setIsVisible(true);
  };
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
      setComments(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="my-4 ">
        <div className="space-y-4">
          {loading ? (
            <p>Loading comments...</p>
          ) : (
            <>
              {comments.length === 0 && <p>No comments yet</p>}
              {comments.length !== 0 &&
                comments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="p-4 rounded shadow m-4 border border-bt-navy"
                  >
                    {isVisible && (
                      <DeleteDialogueBox
                        blogId={blogId.toString()} 
                        commentId={comment.id}
                        userId={loggedInUserId}
                        isComment={true}
                        onClose={() => setIsVisible(false)}
                      />
                    )}
                    <p className="text-gray-500 text-sm mt-2">
                      User {comment.user_id} says:
                    </p>
                    <Markdown>{comment.content}</Markdown>
                    <div className="flex items-center">
                      {isVisibleLikes && <Likes id={comment.id} />}
                      {isVisibleDeleteButton && (
                        <svg
                          onClick={openDelete}
                          className="w-12 h-12 text-red-400 cursor-pointer ml-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;
