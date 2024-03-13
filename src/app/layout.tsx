import type { Metadata } from "next";
import { Figtree, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "./Provider";

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
            <Navbar />
            {children}
          </AuthProvider> 
        </main>
      </body>
    </html>
  );
}
