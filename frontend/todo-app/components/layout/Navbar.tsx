"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)


  return (
    <nav className='bg-gray-800 text-white p-4 sm:p-6 md:flex
    md:justify-between md:items-center'>
    <div className='container mx-auto flex justify-between items-center'>
      <p className='text-lg font-bold'>TODO APP</p>
      <div className= {'${isOpen ? "flex : "hidden"} flex-col md:flex-row'}>
        <Link href={'/login'} className='mx-2 hover:text-gray-300'>Sign In</Link>
        <Link href={'/register'} className='mx-2 hover:text-gray-300'>Sign up</Link>
      </div>
      <div className='md:hidden flex items-center'>
        <Button onClick={() => {
          setIsOpen(!isOpen);
        }}>
          
        </Button>
      </div>

    </div>
    </nav>
  )
}

export default Navbar
