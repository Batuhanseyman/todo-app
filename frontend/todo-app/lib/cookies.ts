import { parseCookies, setCookie, destroyCookie } from "nookies";


export const setSessionCookie = (uid: string) => {
  setCookie(null, "user_session", uid, {
    maxAge: 7 * 24 * 60 * 60, // 7 gün
    path: "/", 
    secure: true, 
    sameSite: "Lax", 
    httpOnly: false, 
  });
};


export const getSessionCookie = (): string | null => {
  const cookies = parseCookies();
  return cookies.user_session || null;
};

export const removeSessionCookie = () => {
  destroyCookie(null, "user_session", { path: "/" });
};
