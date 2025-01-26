import React from 'react'
import {Button} from '@/components/ui/button'
import TodoCard from '@/components/todo/TodoCard'
import { useRouter } from 'next/router'
import { logoutUser } from '@/firebase/firebaseAuthService'

const page = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logoutUser(); 
      console.log("Kullanıcı çıkışı başarılı.");
      router.push("/login"); 
    } catch (error) {
      console.error("Çıkış hatası:", error);
    }
  };


  return (
    <div className='min-h-screen  w-full flex flex-col items-center  bg-gradient-to-r from-blue-600 to-emerald-400'>
      <div className="self-end mb-4 mt-3">
        <Button className="border rounded-lg bg-red-600 text-center p-2 
         text-white hover:bg-red-700" onClick={handleSignOut}>
          Sign Out
         </Button>        
      </div>
      <TodoCard></TodoCard>
    </div>
  )
}

export default page
