import { getSessionCookie } from "@/lib/cookies";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URI; 

export const getRequestCounts = async () => {
    try {
        const uid = getSessionCookie(); 
    
        if (!uid) throw new Error("No session found");
        const response = await axios.get(`${API_URL}/requestcounts/${uid}`, {
            headers: {
              "Content-Type": "application/json",
              "userid": `${uid}`,
            },
          });
          return {data: response.data.data.counts, success: response.data.success};
    } catch (error) {
        console.error("Error fetching request counts:", error);
        return [];
    }
}