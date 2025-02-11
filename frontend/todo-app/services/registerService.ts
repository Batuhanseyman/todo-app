import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URI; 
export const registerUserMongo = async (userId: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/register`, 
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/json", 
            "userid": userId, 
          },
        }
      );
     
    } catch (error) {
      console.error("Error registering user on backend:", error);
      throw error; 
    }
  };