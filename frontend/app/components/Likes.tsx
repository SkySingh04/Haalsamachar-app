"use client";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { updateDoc, doc, increment, getDoc , setDoc } from "firebase/firestore";

interface LikesProps {
  id: number;
}

const Likes: React.FC<LikesProps> = ({ id }) => {
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    // Fetch upvotes and downvotes from Firebase
    const fetchLikes = async () => {
      const likesRef = doc(db, "likes", id.toString());
      const likesSnap = await getDoc(likesRef);
      if (likesSnap.exists()) {
        const data = likesSnap.data();
        setVotes(data.likes);
      }
      else{
        const likes = {
          id: id,
          likes: 0,
        };
        const likesDoc = await setDoc(doc(db, "likes", id.toString()), likes);
      }
    };
    fetchLikes();
  }, []);

  const handleUpvote = async () => {
      // Increment upvotes count in Firebase for the id
      const likesRef = doc(db, "likes", id.toString());

      await updateDoc(likesRef, {
          likes: increment(1)
      });
  setVotes(votes + 1);
  };
  

  const handleDownvote = async () => {
      // Increment downvotes count in Firebase
      const likesRef = doc(db, "likes", id.toString());
      await   updateDoc(likesRef, {
          likes: increment(-1)
      });

      setVotes(votes - 1);
  };

  return (
    <div className="flex items-center m-2 justify-end">
      <p className="mr-2">{votes}</p>
      <button
        className="mr-2 px-4 py-2 bg-bt-sage text-black rounded"
        onClick={handleUpvote}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      <button
        className="px-4 py-2 bg-bt-navy text-white rounded"
        onClick={handleDownvote}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Likes;
