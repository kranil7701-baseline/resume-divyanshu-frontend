const production = true;

export const API = production ? 'https://resume-divyanshu-backend.vercel.app' : 'http://localhost:8000'
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '235462551112-imhssuvj1if5jeebgc91cc0om79tn8u1.apps.googleusercontent.com'
