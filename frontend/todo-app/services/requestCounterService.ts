import { getSessionCookie } from "@/lib/cookies";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URI; 

export interface RequestCounts {
  DELETE: number;
  GET: number;
  POST: number;
  PUT: number;
  success: boolean;
}



export const getRequestCounts = async (): Promise<RequestCounts | null> => {
    try {
        const uid = getSessionCookie(); 
    
        if (!uid) throw new Error("No session found");
        const response = await axios.get(`${API_URL}/requestcounts/${uid}`, {
            headers: {
              "Content-Type": "application/json",
              "userid": `${uid}`,
            },
          });
          const requestCounts: RequestCounts = {DELETE: response.data.data.counts.DELETE, GET: response.data.data.counts.GET, 
            POST: response.data.data.counts.POST, PUT: response.data.data.counts.PUT, success: response.data.success
          };
          return requestCounts;
    } catch (error) {
        console.error("Error fetching request counts:", error);
        return null;
    }
}