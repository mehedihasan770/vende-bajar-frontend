import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

interface AuthResponse {
  id?: string;
  fullName?: string;
  email?: string;
  role?: string;
  isLoggedIn: boolean;
}

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('vende_token')?.value;

  // ১. লগইন না থাকলে সরাসরি বের করে দাও
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, request.url));
  }

  try {
    if (token) {
      const decoded: AuthResponse = jwtDecode(token);
      const userRole = decoded.role || 'user';

      // --- ২. মেইন রিডাইরেক্ট লজিক (সবচেয়ে ফাস্ট) ---
      // কেউ যদি শুধু '/dashboard' লিখে আসে, তাকে সাথে সাথে তার রোলে পাঠিয়ে দাও
      if (pathname === '/dashboard') {
        return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
      }

      // ৩. এডমিন প্রোটেকশন
      if (pathname.startsWith('/dashboard/admin') && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard/user', request.url));
      }

      // ৪. ভেন্ডর প্রোটেকশন
      if (pathname.startsWith('/dashboard/vendor') && userRole !== 'vendor') {
        return NextResponse.redirect(new URL('/dashboard/user', request.url));
      }
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
  ],
};