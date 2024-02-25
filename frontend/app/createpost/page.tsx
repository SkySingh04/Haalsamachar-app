'use server'
import CreatePost from "./CreatePost"
import { auth } from "@/auth"

const usersAPI = process.env.NEXT_PUBLIC_USERS_API_URL;
const blogsAPI = process.env.NEXT_PUBLIC_BLOGS_API_URL;
async function getAuth() {
  // "use server"; // mark function as a server action (fixes the error)
  const session = await auth();
  return session;
}



async function createBlogPost(blog: any) {
  // "use server"; // mark function as a server action (fixes the error)

  const response = await fetch(`${usersAPI}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });
  const data = await response.json();
  return data;
}

export default async function Page(){
    const session = await auth()
  // console.log(session);
  const name = session?.user?.email ?? '';
  console.log('name', name);
  const userId  = await fetch(`${usersAPI}/users/username/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await userId.json();
    console.log('data', data);
    const userid = data.ID;

  return (
    <CreatePost
    userId = {userid}
      // getAuth={getAuth}
      // createBlogPost={createBlogPost}
    />
  )
}