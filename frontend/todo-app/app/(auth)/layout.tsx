import React from "react";
import "../globals.css";
import { AuthProvider } from "@/providers/authProvider";

export default function RootLayout ({ children }: { children: React.ReactNode }) {
    return (
    <html>
        <AuthProvider>
        <body>
            {children}
        </body>
        </AuthProvider>
        
    </html>
    )
}