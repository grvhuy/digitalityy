"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/system";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
};
