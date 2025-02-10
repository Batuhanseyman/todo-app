import React from "react";
import "../../globals.css";
import { AuthProvider } from "@/providers/authProvider";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout ({ children }: { children: React.ReactNode }) {
    return (
    <html>
        <AuthProvider>
        <body>
            <Navbar/>
            {children}
        </body>
        </AuthProvider>
        
    </html>
    )
}