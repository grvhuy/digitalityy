"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  const handleSubmit = async (e:any) => {
      e.preventDefault();
      if ( !email || !password) {
        setError("Please fill all the fields");
        return;
      }
      // Kiem tra trung email
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (!res?.ok) {
          setError("Invalid credentials, please try again.");
          return;
        }

        if (error) {
          setError(error);
          return;
        }
        router.replace("/dashboard");

      } catch (error) {
        console.log("Error during registration: ", error);
      }
  }

  return (
    <div className="grid place-items-center">
      <div className="w-[400px] shadow-lg p-5 rounded-lg border-t-4 border-blue-500">
        <h1 className="text-xl font-bold my-4">Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <Button className="mt-4 rounded-md bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
            Sign In
          </Button> 

          <div className="mt-6 items-center justify-center">
            <h3 className="text-center font-semibold">Continue with</h3>
            <div className="flex items-center justify-center space-x-4">
              <Button type="button" onClick={() => signIn('google')} className="mt-4 rounded-md bg-orange-600 text-white font-bold cursor-pointer px-6 py-2">
                <IoLogoGoogle size={20} className="mx-2" />
              </Button>
              <Button onClick={() => signIn('facebook')} className="mt-4 rounded-md bg-[#0866ff] text-white font-bold cursor-pointer px-6 py-2">
              <IoLogoFacebook size={20} className="mx-2" />
              </Button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/sign-up"}>
            Create an Account <span className="underline">Sign Up</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
