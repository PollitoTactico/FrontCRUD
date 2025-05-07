import type { Metadata } from "next";
import { Madimi_One } from "next/font/google";
import "./globals.css";

const madimiOne = Madimi_One({
  weight: ['400'],
  variable: "--font-madimi-one",
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
    <html lang="en" className={`light ${madimiOne.variable}`}>
      <body className="bg-[#22A39F] min-h-screen">
        {children}
      </body>
    </html>
  );
}
