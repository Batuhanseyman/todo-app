"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { User, onAuthStateChanged, getAuth  } from "firebase/auth";
import {auth} from "@/firebase/firebaseConfig"
import { setSessionCookie, getSessionCookie, removeSessionCookie } from "@/lib/cookies";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUID = getSessionCookie();
    if (storedUID) {
      setUser({ uid: storedUID } as User);
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
    //   setUser(currentUser);
    //   setLoading(false);
    if (currentUser) {
        setSessionCookie(currentUser.uid); 
        setUser(currentUser);
      } else {
        removeSessionCookie(); 
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
