import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { AuthProvider } from "./Provider";
import { Provider } from "react-redux";
import "./globals.css";
import { store } from "@/lib/store";
import ReduxProvider from "./ReduxProvider";
import Footer from "@/components/footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";

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
    <html lang="en" className="overflow-x-hidden overflow-y-scroll">
      <body className={`${font.className}`}>
        <main>
          <ReduxProvider>
            <AuthProvider>
              <Header />
              {children}
              <Footer />
            </AuthProvider>
          </ReduxProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
