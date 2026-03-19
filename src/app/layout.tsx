import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vende Bajar | Luxury E-commerce Showcase",
    template: "%s | Vende Bajar",
  },
  
  description: "A high-end conceptual E-commerce platform built with Next.js, TypeScript, and AI. Featuring a unique 'Absurd Luxury' theme, showcasing advanced UI/UX, role-based dashboards, and AI-powered product insights.",
  
  keywords: [
    "Next.js Project", 
    "MERN Stack Developer Portfolio", 
    "TypeScript E-commerce", 
    "AI Integration", 
    "Tailwind CSS Design", 
    "Full-stack Web Application"
  ],
  
  authors: [{ name: "MD Mehedi Hasan", url: "https://your-portfolio-link.com" }],
  creator: "MD Mehedi Hasan",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vende-bajar.vercel.app",
    title: "Vende Bajar - Advanced Next.js Showcase",
    description: "Exploring the intersection of AI, luxury branding, and modern web technologies.",
    siteName: "Vende Bajar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* navar component */}
        <header>
          <Navbar/>
        </header>

        {/* main contents */}
        <main className="max-w-11/12 md:max-w-10/12 mx-auto">
          <QueryProvider>
            {children}
          </QueryProvider>
        </main>

        {/* footer component */}
        <footer>

        </footer>
      </body>
    </html>
  );
}
