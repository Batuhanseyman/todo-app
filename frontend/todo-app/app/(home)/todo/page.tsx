import React from 'react'
import {Button} from '@/components/ui/button'
import TodoCard from '@/components/todo/TodoCard'


const page = () => {

  return (
    <div className='min-h-screen  w-full flex flex-col items-center justify-center  bg-gradient-to-r from-blue-600 to-emerald-400'>
      <TodoCard></TodoCard>
    </div>
  )
}

export default page
