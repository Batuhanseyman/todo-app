"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "firebase/auth";
import { getSessionCookie} from "@/lib/cookies";
import { listenAuthChanges } from "@/firebase/firebaseAuthService";

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

    const unsubscribe = listenAuthChanges(setUser);

    setLoading(false);

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
