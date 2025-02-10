"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { registerUser, loginWithGoogle } from "@/firebase/firebaseAuthService";
import { useRouter } from "next/navigation";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import {registerUserMongo} from '@/services/registerService'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FirebaseError } from "firebase/app";
import { FcGoogle } from "react-icons/fc";
import { addLocalTodosToBackend } from "@/services/localTodoService";

// Zod şeması
const formSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .min(12, { message: "Email must be at least 12 characters." })
      .max(50)
      .refine(async (email) => {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        return methods.length === 0;
      }, {
        message: "This email is already in use",
        path: ["email"],
      }),

    username: z.string().min(2, {
      message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .superRefine(({ email, password }, ctx) => {
    if (!email || !password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,  // Zod hata kodu eklendi
        path: ["email"],
        message: "Email and password are required",
      });
    }
  });

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      
      const user = await registerUser(values.email, values.password);
      await registerUserMongo(user.uid);
      await addLocalTodosToBackend(user.uid);
      router.push("/");

    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use");
      } else {
        setError("An error occurred during registration");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
          setError(null)
          setLoading(true)
          try {
            const user = await loginWithGoogle()
            if (user) {
              await addLocalTodosToBackend(user.uid);
              router.push("/")
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
    <div className="w-full max-w-md md:w-3/4 shadow border border-solid border-gray-500 bg-white rounded-2xl p-5 flex flex-col items-center justify-center">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-black ">Create an account</h1>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="username@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          
          <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          
          <Button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </Form>

        <Button onClick={handleGoogleLogin} disabled = {loading} className='mt-4'>
        <FcGoogle size={20} />
          {loading ? "Loading..." : "Sign in with Google"}
          </Button>

      <div className="flex gap-2 items-center justify-items-center mt-4">
        <p>You already have an account?</p>
        <Link className="hover:bg-slate-800 border rounded-md border-white bg-slate-950 text-white p-1" href="/login">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
