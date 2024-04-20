'use client'
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { auth , db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import {  doc, setDoc  } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { SingleImageDropzone } from "@/app/components/SingleImageDropzone";
import { useEdgeStore } from "@/app/lib/edgestore";


const blogsAPI = process.env.NEXT_PUBLIC_BLOGS_API_URL;
const usersAPI = process.env.NEXT_PUBLIC_USERS_API_URL;

const CreatePost = () =>  {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");


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
    const spotify = formData.get("spotify");
    const content = e.target.content.value;
    const userIdNum =  parseInt(userId);
    const blog = {
      userId: userIdNum,
      title: title,
      content: content,
      subtitle: subtitle,
      image: image,
      spotifyLink: spotify,
      uploadedImageUrl : imageUrl,
    };

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
        throw new Error(data.message);
      }
      toast.success("Post created successfully");
      // Clear the form inputs
      e.target.reset();
      e.target.content.value = ""
      //create a likes document in the likes collection for the new blog post in firebase
      try{
      const likes = {
        id: data.id,
        likes: 0,
      };
      const likesDoc = await setDoc(doc(db, "likes", data.id.toString() ), likes);
      console.log("Likes document created successfully");
      router.push(`/blogs/${data.id}`);
    } catch (error) {
      console.error("Error creating likes document:", error);
      toast.error("Error creating likes document");
    }
      


    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error("Error creating blog post");
    } finally {
      setLoading(false);
    }
  };

  return  (
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
            <label htmlFor="spotify" className="block font-semibold">
              Spotify URL:
            </label>
            <input
              type="text"
              id="spotify"
              name="spotify"
              placeholder="ex: https://open.spotify.com/track/5bgwqaRSS3M8WHWruHgSL5"
              className="w-full border border-bt-teal bg-bt-peach text-bt-navy rounded-md px-4 py-2"
            />
          </div>
          <SingleImageDropzone
        width={700} 
        height={200}
        value={file}
        onChange={(file : any) => {
          setFile(file);
        }}
      />
      <button
                    className="bg-bt-teal text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  disabled={progress === 100}
                    onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress : any) => {
                setProgress(progress)
              },
            });
            toast.success("Image uploaded successfully")
            console.log("Image url" + res.url )
            setImageUrl(res.url);
          }
        }}
      >
        Upload
      </button>
      
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
              className="bg-bt-teal text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
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
