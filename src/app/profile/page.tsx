'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Profile = () => {
   const router =  useRouter();
  const handleLogout = async()=>{
    try{
      const response = await axios.get('/api/user/logout');
      if(response){
        console.log(response);
        toast.success("Logout Success");
        router.push('/login');
      }
    }
    catch(error:any){
      console.log(error);
      toast.error(error);
    }

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <p>profile page</p>
      <hr />
      <button onClick={handleLogout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
    </div>
  )
}

export default Profile
