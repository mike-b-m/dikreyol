import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./q/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Di-kreyol",
  description: "Di-kreyol se yon site ki bay definisyon mo kreyol",
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
        {children}

        <footer>
        <div className="text-center mt-6">
        © 2025 Di-kreyol. All rights reserved.
        </div>
      </footer>

      </body>
      
    </html>
  );
}
