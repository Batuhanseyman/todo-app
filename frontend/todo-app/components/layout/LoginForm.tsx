"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(2, {
        message: "Username must be at least 4 characters.",
      })
  })


const LoginForm = () => {
  const router = useRouter();
 
      const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            username: "",
            password: ""
          },
        })
        function onSubmit(values: z.infer<typeof formSchema>) {
          // Do something with the form values.
          // ✅ This will be type-safe and validated.
          console.log(values)
        }
  
  return (

    <div className='w-full max-w-md md:w-3/4 shadow  border border-solid border-gray-500  bg-white rounded-2xl p-5 flex flex-col
    items-center justify-center'>
        <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-black ">Sign in to your account</h1>   
        </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type='password' placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" onClick={() => router.push("/todo")}>Sign in</Button>
            <div className='flex gap-2 items-center justify-items-center'><p>Create an account</p> 
            <Link className='hover:bg-slate-800 border rounded-md border-white bg-slate-950 text-white p-1' href='/register'>Sign up</Link></div>
        </form>
        </Form>
    </div>

  )
}

export default LoginForm
