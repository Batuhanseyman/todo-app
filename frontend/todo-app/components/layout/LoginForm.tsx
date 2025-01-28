"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import {loginUser, loginWithGoogle} from '@/firebase/firebaseAuthService'
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
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
    email: z.string().min(12, {
      message: "Email must be at least 12 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
      })
  })


const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
 
      const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            email: "",
            password: ""
          },
        })

        const onSubmit = async (values: z.infer<typeof formSchema>) => {
          setError(null)
          setLoading(true)
          try {
            await loginUser(values.email, values.password)
            router.push("/todo")
          } catch (err) {
            if (err instanceof FirebaseError) {
              switch (err.code) {
                case "auth/user-not-found":
                  setError("No account found with this email.")
                  break
                  
                case "auth/invalid-credential":
                  setError("Incorrect email or password please try again.")
                  break

                case "auth/too-many-requests":
                  setError("Too many attempts. Please try again later.")
                  break

                default:
                  setError("An error occurred. Please try again.")
              }
            } else {
              setError("An unknown error occurred.")
            }
          } finally {
            setLoading(false)
          }
        }


        const handleGoogleLogin = async () => {
          setError(null)
          setLoading(true)
          try {
            const user = await loginWithGoogle()
            if (user) {
              router.push("/todo")
            }
          } catch (err) {
            if (err instanceof FirebaseError) {
              setError("Google sign-in was canceled or failed.")
            }
          } finally {
            setLoading(false)
          }

        }
  
  return (

    <div className='w-full max-w-md md:w-3/4 shadow  border border-solid border-gray-500  bg-white rounded-2xl p-5 flex flex-col
    items-center justify-center'>
        <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-black ">Sign in to your account</h1>   
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="username@example.com" {...field} />
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
            <Button type="submit" disabled = {loading}>
              {loading ? "Signing in..." : "Sign in"}
              </Button>
        </form>
        </Form>
        <Button onClick={handleGoogleLogin} disabled = {loading} className='mt-4'>
        <FcGoogle size={20} />
          {loading ? "Loading..." : "Sign in with Google"}
          </Button>
            <div className='flex gap-2 items-center justify-items-center mt-4'><p>Create an account</p> 
            <Link className='hover:bg-slate-800 border rounded-md border-white bg-slate-950 text-white p-1' href='/register'>Sign up</Link></div>
    </div>

  )
}

export default LoginForm
