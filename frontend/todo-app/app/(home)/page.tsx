import Image from "next/image";
import Link from "next/link";

export default function Home()  {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 to-emerald-400 w-full'>
        <h1 className="text-2xl text-white">Welcome to todo app! Please sign in to use the app</h1>
        <div className="flex items-center gap-1 mt-2">
          <Link href='/login' className="border rounded-lg text-lg bg-gray-600 text-white p-2 w-24 text-center hover:bg-gray-700">Sign In</Link>
          <Link href='/register' className="border rounded-lg text-lg bg-gray-600 text-white p-2  w-24 text-center hover:bg-gray-700">Sign Up</Link>
        </div>

    </div>
  
  );
}
