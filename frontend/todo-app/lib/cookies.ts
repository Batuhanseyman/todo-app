import { strict } from "assert";
import nookies from "nookies";


export const setSessionCookie = (uid: string) => {
  nookies.set(null, "user_session", uid, {
    maxAge: 60 * 60 * 24 * 7, 
    path: "/", 
    secure: process.env.NODE_ENV === "production",
    httpOnly: false, 
  });
};

export const removeSessionCookie = () => {
  nookies.destroy(null, "user_session", {path: "/"});
};

export const getSessionCookie = () => {
  const cookies = nookies.get(null);
  return cookies.user_session || null;
};
