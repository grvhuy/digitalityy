import type { Metadata } from "next";
import { Figtree, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "./Provider";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={`${font.className} overflow-hidden`}>
        <main>
          <AuthProvider>
            <Header />
            {children}
            {/* <Footer/> */}
          </AuthProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
