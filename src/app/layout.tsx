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
      <body
        className={`${font.className} overflow-y-visible overflow-x-hidden relative`}
      >
        <main>
          <ReduxProvider>
            <AuthProvider>
              <Header />
              {children}
            </AuthProvider>
          </ReduxProvider>
        </main>
        <Toaster />
      </body>
      <Footer />
    </html>
  );
}
