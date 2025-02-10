import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup,
    getIdToken,
    User ,
    onAuthStateChanged
  } from "firebase/auth";
  import { auth } from "./firebaseConfig";
import {setSessionCookie, removeSessionCookie } from "@/lib/cookies";
  
  export const registerUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      setSessionCookie(uid);

      return userCredential.user;
    } catch (error) {
      console.error("Error during register:", error);
      throw error;
    }
  };
  
  export const loginUser = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
  
      setSessionCookie(uid);
  
      return userCredential.user;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };
  
  export const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
    
      if (!result.user) {
        throw new Error("Google authentication failed: No user found");
      }
      const uid = result.user.uid;
      setSessionCookie(uid);
      
      return result.user;
    } catch (error: any) {
        if (error.code === 'auth/cancelled-popup-request'|| error.code === "auth/popup-closed-by-user") {
          console.log("User canceled the process");
        } else {
          console.error("Google sign-in error:", error);
        }
        throw error;
    } 
      
  };
  
  export const logoutUser = async () => {
    try {
      await signOut(auth);
      removeSessionCookie();
    } catch (error) {
      console.error("Error during sign-out:", error);
      throw error;
    }
  };
  
  export const listenAuthChanges = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setSessionCookie(currentUser.uid);
        callback({
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          email: currentUser.email
        } as User);
      } else {
        removeSessionCookie();
        callback(null);
      }
    });
  }