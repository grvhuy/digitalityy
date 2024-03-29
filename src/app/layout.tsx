import type { Metadata } from "next";
import { Figtree, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "./Provider";
import Header from "@/components/header/Header";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digitality",
  description: "World of Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <main>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider> 
        </main>
      </body>
    </html>
  );
}
