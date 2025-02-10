"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { logoutUser } from "@/firebase/firebaseAuthService";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/authProvider";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await logoutUser();
      console.log("Sign-out successful.");
      router.push("/login");
    } catch (error) {
      console.error("Sign-out Error:", error);
    }
  };

  return (
    <>
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-lg font-bold" href="/">
          TODO APP
        </Link>

        <div className="hidden md:flex space-x-4">
          {user ? (
            <Button
              className="border rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">
                Sign In
              </Link>
              <Link href="/register" className="hover:text-gray-300">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobil Menü Açılır-Kapanır */}

    </nav>
          <div
          className={`${
            isOpen ? "flex" : "hidden" 
          } md:hidden flex flex-col items-center bg-gray-800 py-4 space-y-4 text-white`}
        >
          {user ? (
            <Button
              className="border rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
            <div className="hover:text-gray-300">
            <Link href="/login">
                Sign In
              </Link>
            </div>
            <div className="hover:text-gray-300 ">
            <Link href="/register">
                Sign Up
              </Link>
            </div>
            </>
          )}
        </div>
      </>
  );
};

export default Navbar;
