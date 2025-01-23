import React from 'react'

const LoginForm = () => {
  return (
    <div className='w-full max-w-md md:w-3/4 shadow  border border-solid border-gray-500  bg-slate-300 rounded-2xl p-5 flex flex-col
    items-center justify-center'>
    <div className="text-center mb-6">
    <h1 className="text-2xl font-semibold text-black ">Sign in to your account</h1>   
    </div>    
    <form className='space-y-4'>
    <div>
    <label htmlFor='email' className="block text-sm font-medium
         text-gray-900"> Your Email : </label>
        <input 
              type="email" 
              id="email" 
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" 
              placeholder="username@example.com" 
              required/>
    </div>
    <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
            <input 
              type="password" 
              id="password" 
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" 
              placeholder="••••••••" 
              required/>
    </div>
    <div>
    <button type="submit" className="w-full text-white bg-gray-600 hover:bg-gray-800 rounded-lg text-sm px-5 py-2.5 text-center">
            Sign in
          </button>
    </div>
    </form>
    </div>

  )
}

export default LoginForm
