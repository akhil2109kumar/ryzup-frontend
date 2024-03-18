"use client"
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'


const Login = () => {
    const session =useSession();
    console.log(session);
    if(session.status ==="loading"){
        return <p>Loading....</p>
    }

    //@ts-ignore
    if(session.data?.user?.email?.length > 0){
      redirect('/income-tax-calculator');
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
       <div className="bg-white flex justify-between p-5 rounded-lg shadow-lg">
       <Image src="/assets/google-logo.png" alt="My Image" width={50} height={30} />
        <button className='ml-2 cursor-pointer' onClick={() => signIn('google')}>Sign in with Google</button>
    </div>
    </div>
  )
}

export default Login