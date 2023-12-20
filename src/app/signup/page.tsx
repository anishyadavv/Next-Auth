'use client'
import { useState } from "react"
import React from "react"
import  Link from "next/link"
import axios from 'axios'
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
const Signup = () => {
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState({
    name:"",
    email:"",
    password:"",
  });

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log(user);
    try{
      setLoading(true);
          axios.post('/api/user/signup',{
            username: user.name,
            email: user.email,
            password: user.password
          })
          .then((response)=>{
              console.log(response);
              toast.success("Account Created Successfully");
              router.push('/login');
          })
          .catch((error)=>{
            toast.error(error)
          })
    }
    catch(error:any){
      console.log(error);
      toast.error(error);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <>
   <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
  </svg>
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div className="mt-2">
          <input id="name" name="name" type="text" onChange={(e)=>{setUser({...user,name:e.target.value})}} autoComplete="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" onChange={(e)=>{setUser({...user,email:e.target.value})}} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" autoComplete="current-password" onChange={(e)=>{setUser({...user,password:e.target.value})}} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? "Processing...." :"Sign Up"}</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Already have an Account?
      <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign in</Link>
    </p>
  </div>
</div>
</>
  )
}

export default Signup
