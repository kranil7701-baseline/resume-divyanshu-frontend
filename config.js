const isDev = typeof window !== 'undefined' ? window.location.hostname === 'localhost' : process.env.NODE_ENV === 'development';

export const API = isDev ? 'http://localhost:8000' : 'https://resume-divyanshu-backend.vercel.app'
// export const API = 'http://localhost:8000'
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '235462551112-imhssuvj1if5jeebgc91cc0om79tn8u1.apps.googleusercontent.com'
