import RegisterForm from '@/components/layout/RegisterForm'
import React from 'react'
import Link from 'next/link'

const Page = () => {
  return (
    <>
      <div className='bg-gradient-to-r from-blue-600 to-emerald-400 relative'>
        <Link href = '/' className='absolute left-4 top-2  bg-gray-950 text-white border rounded-lg p-2'>🡸 Go to home page</Link>
      </div>
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 to-emerald-400 w-full'>
      <RegisterForm></RegisterForm>
    </div>
    </>
  )
}

export default Page
