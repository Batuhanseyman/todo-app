"use client"
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/providers/authProvider'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { getRequestCounts } from '@/services/requestCounterService'
import { RequestCounts } from '@/services/requestCounterService'

const ProfileCard = () => {
    const {user} = useContext(AuthContext);
    const [requestCounts, setRequestCounts] = useState<RequestCounts | null>(null);

    const getAvatarUrl = () => {
        if (user?.photoURL) {
          return user?.photoURL;
        } else if (user?.email) {
          const firstLetter = user.email.charAt(0).toUpperCase();
          return `https://ui-avatars.com/api/?name=${firstLetter}&background=random&color=fff&size=96`;
        }
      };

    useEffect(() => {
        const fetchRequestCounts = async () => {
            try {
              const response = await getRequestCounts();
              if(response?.success)
                setRequestCounts(response);
            } catch (error) {
              console.error("Error fetching request counts:", error);
            }
          };
      
          if (user) {
            fetchRequestCounts();
          }
    }, [user]);

    
  return (
  user ? (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="w-24 h-24">
  
          <AvatarImage src={getAvatarUrl()} alt="User's profile picture" />
          <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "UN"}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">{user?.displayName || "Name"}</h2>
          <p className="text-muted-foreground">{user?.email || "john.doe@example.com"}</p>
        </div>
        <div className='space-y-2 text-center'>
        <h2 className="text-xl font-bold">Request Counts</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1 justify-self-center">
            <Label htmlFor="GET">GET</Label>
            <p id="GET" className="text-sm">
              {requestCounts?.GET}
            </p>
          </div>
          <div className="space-y-1 justify-self-center">
            <Label htmlFor="POST">POST</Label>
            <p id="POST" className="text-sm">
              {requestCounts?.POST}
            </p>
          </div>
          <div className="space-y-1 justify-self-center">
            <Label htmlFor="PUT">PUT</Label>
            <p id="PUT" className="text-sm">
              {requestCounts?.PUT}
            </p>
          </div>
          <div className="space-y-1 justify-self-center">
            <Label htmlFor="DELETE">DELETE</Label>
            <p id="DELETE" className="text-sm">
                {requestCounts?.DELETE}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>) : (
        <div className='flex items-center text-white text-2xl'><p>You must login to view this content...</p></div>
    )
  )
}

export default ProfileCard
