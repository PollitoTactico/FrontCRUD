// Si no se usan, remover las importaciones
// import { GeistSans, GeistMono } from 'geist/font'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRUD de Usuarios",
  description: "Aqui hice mi CRUD de Usuarios xd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="bg-[#578FCA] min-h-screen">
        {children}
      </body>
    </html>
  );
}
