'use client'
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { usePathname } from 'next/navigation';
import Comments from '../../components/Comments';
import CommentForm from '../../components/CommentForm';
import Markdown from 'react-markdown';
import Likes from '@/app/components/Likes';
import DeleteDialogueBox from '../../components/DeleteDialogueBox';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useQuery, gql } from '@apollo/client';
import SpotifyCard from '@/app/components/SpotifyCard';

//REST API URL
const usersAPI = process.env.NEXT_PUBLIC_USERS_API_URL;

//GraphQL queries
const GET_BLOG_BY_ID = gql`
  query GetBlogById($blogId: ID!) {
    blogPost(BlogID: $blogId) {
      id
      title
      content
      created_at
      subtitle
      image
      uploadedImageLink
      spotifyLink
      user {
        id
        username
      }
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    user(UserID: $userId) {
      id
      username
    }
  }
`;

const Page = () => {
  const [isVisibleLikes, setIsVisibleLikes] = useState(true);
  const [isVisibleDeleteButton, setIsVisibleDeleteButton] = useState(true);
  const [isVisibleCommentsSection, setIsVisibleCommentsSection] = useState(true);
  const [loggedInUserId, setLoggedInUserId] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const blogid = pathname.split('/').pop();

  // Fetch blog post data
  const { loading: blogLoading, error: blogError, data: blogData } = useQuery(GET_BLOG_BY_ID, {
    variables: { blogId: blogid },
  });

  // Fetch user data
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { userId: blogData?.blogPost?.user?.id },
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsVisibleLikes(false);
        setIsVisibleDeleteButton(false);
        setIsVisibleCommentsSection(false);
      } else {
        console.log('User logged in successfully');
        try {
          const userEmail = user.email;
          const userIdResponse = await fetch(`${usersAPI}/users/email/${userEmail}`);
          const userIdData = await userIdResponse.json();
          const userid = userIdData.ID;
          setLoggedInUserId(userid);
          setIsVisibleLikes(true);
          setIsVisibleDeleteButton(true);
          setIsVisibleCommentsSection(true);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }, [auth]);

  if (blogLoading || userLoading) return <div>Loading...</div>;
  if (blogError || userError) return <div>Error: {blogError && blogError.message || userError && userError.message}</div>;

  const blog = blogData.blogPost;
  const user = userData.user;

  // Function to open delete dialogue
  const openDelete = () => {
    setIsVisible(true);
  };

  // Format date function
  const formatDate = (timestamp : any) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  };

  const formattedDate = formatDate(blog.created_at);

  return (
    <div>
      <Header bgImage={blog.image} heading={blog.title} subheading={blog.subtitle} />
      <div className="container mt-12 mx-auto p-4 px-10 border-x-4 flex justify-center flex-col items-center border-bt-navy">
        <Markdown className="text-center text-2xl">{blog.content}</Markdown>
        {isVisible && <DeleteDialogueBox
            blogId={blog.id}
            userId={loggedInUserId}
            isBlog={true}
            onClose={() => setIsVisible(false)}
           />}
        <img
          src={blog.uploadedImageLink}
          alt={blog.title}
          width={500}
          height={500}
          className="m-8 transform scale-100 hover:scale-110 transition duration-300 ease-in-out"
        />
        <div className="flex items-center justify-end text-right mt-4 flex-col">
          <p className="text-bt-teal">Written By: {user?.username}</p>
          <p className="text-bt-teal">Published On: {formattedDate}</p>
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
        {blog.spotifyLink && <SpotifyCard trackLink={blog.spotifyLink} />}
        <div className="mt-8">
          <h2 className="text-3xl text-bt-peach">Comments</h2>
          <Comments blogId={blog.id} isVisibleDeleteButton={isVisibleDeleteButton} isVisibleLikes={isVisibleLikes} loggedInUserId={loggedInUserId} />
          {isVisibleCommentsSection && <CommentForm blogId={blog.id} userId={loggedInUserId} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
