import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

interface AuthResponse {
  id?: string;
  fullName?: string;
  email?: string;
  role?: 'admin' | 'vendor' | 'user'; 
  isLoggedIn: boolean;
}

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('vende_token')?.value;

  // ১. টোকেন না থাকলে সরাসরি লগইন পেজে রিডাইরেক্ট
  if (!token) {
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, request.url));
    }
    return NextResponse.next();
  }

  try {
    const decoded: AuthResponse = jwtDecode(token);
    const userRole = decoded.role;

    // ২. যদি টোকেন থাকে কিন্তু কোনো 'role' না থাকে (সিকিউরিটি রিস্ক), তবে লগআউট
    if (!userRole) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('vende_token'); // টোকেন ক্লিয়ার করে দেওয়া
      return response;
    }

    // ৩. রুট ড্যাশবোর্ড (/dashboard) এ হিট করলে রোল অনুযায়ী সঠিক গন্তব্যে পাঠানো
    if (pathname === '/dashboard') {
      return NextResponse.redirect(new URL(`/dashboard/${userRole.toLowerCase()}`, request.url));
    }

    // ৪. স্ট্রিক্ট রোল প্রটেকশন (সবচেয়ে গুরুত্বপূর্ণ অংশ)
    const allowedPathPrefix = `/dashboard/${userRole.toLowerCase()}`;

    // যদি ইউজার তার রোলের জন্য নির্ধারিত পাথ ছাড়া অন্য কোনো ড্যাশবোর্ড পাথে ঢোকার চেষ্টা করে
    if (pathname.startsWith('/dashboard/') && !pathname.startsWith(allowedPathPrefix)) {
      // তাকে তার নিজের রোলের মেইন ড্যাশবোর্ড পেজে ফেরত পাঠানো হবে
      return NextResponse.redirect(new URL(allowedPathPrefix, request.url));
    }

  } catch (error) {
    // টোকেন টেম্পারিং বা ইনভ্যালিড হলে সোজাসুজি লগইন পেজ
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('vende_token');
    return response;
  }

  return NextResponse.next();
};

// ম্যাচার কনফিগ আগের মতোই থাকবে
export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};