"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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
    email : z.string().min(2).max(50),
    username: z.string().min(2, {
      message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(2, {
        message: "Username must be at least 4 characters.",
      })
  })

const RegisterForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email :   "",
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
        <h1 className="text-2xl font-semibold text-black ">Create an account</h1>   
        </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">

            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="username@example.com"  {...field} />
                </FormControl>
                </FormItem>
            )}
            />
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
            <Button type="submit">Sign Up</Button>
            <div className='flex gap-2 items-center justify-items-center'><p>You already have an account?</p> 
            <Link className='hover:bg-slate-800 border rounded-md border-white bg-slate-950 text-white p-1' href={'/login'}>Sign In</Link></div>
        </form>
        </Form>
    </div>
  )
}

export default RegisterForm
