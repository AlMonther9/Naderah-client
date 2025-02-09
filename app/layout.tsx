import React from "react";
import { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/context/language-context";
import NextAuthProvider from "./providers/NextAuthProvider";
import { Footer } from "@/components/Footer";
import { ToastProvider } from "./providers/ToastProvider";

export const metadata: Metadata = {
  title: 'Naderah - نَضِرَة',
  description: '', // todo
  icons: {
    icon: '/logo.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <ToastProvider />
        <LanguageProvider>
          <NextAuthProvider>
            <Navbar />
            {children}
          </NextAuthProvider>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
