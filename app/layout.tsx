import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GyanMatrix | AI + Human Mentorship",
  description: "Personalized Career & Learning Guidance",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf9f8] text-neutral-900 relative">
        {/* Subtle layered background */}
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]"
             style={{
               backgroundImage: `radial-gradient(circle at 50% 0%, #000 0%, transparent 70%), url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
               backgroundSize: '100% 100%, 24px 24px'
             }}
        />
        {children}
      </body>
    </html>
  );
}
