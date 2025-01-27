import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup 
  } from "firebase/auth";
  import { auth } from "./firebaseConfig";
  
  export const registerUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Kayıt sırasında hata:", error);
      throw error;
    }
  };
  
  export const loginUser = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Giriş sırasında hata:", error);
      throw error;
    }
  };
  
  export const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
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
    } catch (error) {
      console.error("Çıkış sırasında hata:", error);
      throw error;
    }
  };
  