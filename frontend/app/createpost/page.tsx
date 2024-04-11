'use server'
import CreatePost from "./CreatePost"
import { auth } from "../firebase"
import {getAuth , onAuthStateChanged} from 'firebase/auth';
import { useRouter } from 'next/navigation';


const usersAPI = process.env.NEXT_PUBLIC_USERS_API_URL;


async function createBlogPost(blog: any) {
 

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
  let   userEmail = null;
  const router = useRouter();
  const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
  userEmail = user.email;
  } else {
    router.push("/login");
  }
});
 
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