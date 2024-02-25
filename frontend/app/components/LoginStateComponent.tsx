import React from 'react'
import { useSession } from 'next-auth/react';

const LoginStateComponent = ({dispatch} :any) => {
  const { data: session } = useSession();  // get the client session
  console.log(session);
  return (
    <div>
      <form action={dispatch}>
        <button className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]">Logout</button>
      </form>

      <>
        <a href="/login" className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]">Login</a>
        <a href="/signup" className="text-bt-peach hover:bg-bt-navy hover:text-black px-3 py-2 rounded-md text-xl font-[100px]">Signup</a>
      </>
    </div>
  )
}

export default LoginStateComponent
