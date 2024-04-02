"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";
import axios from "axios";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/checkRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="w-96 flex flex-col gap-y-5 absolute inset-y-0 right-1/4 justify-center">
      <div className="w-[400px] p-5">
        <h1 className="text-xl font-bold my-4">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <Button
            className="mt-4 rounded-m font-bold cursor-pointer"
            variant={"dark"}
          >
            Register
          </Button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <div className="mt-6 items-center justify-center">
            <h3 className="text-center font-semibold">Continue with</h3>
            <div className="flex items-center justify-center space-x-4">
              <Button
                type="button"
                onClick={() => signIn("google")}
                className="mt-4 rounded-md bg-eerie_black text-white font-bold cursor-pointer px-6 py-2"
              >
                <IoLogoGoogle size={20} className="mx-2" />
              </Button>
              <Button
                type="button"
                onClick={() => signIn("facebook")}
                className="mt-4 rounded-md bg-eerie_black text-white font-bold cursor-pointer px-6 py-2"
              >
                <IoLogoFacebook size={20} className="mx-2" />
              </Button>
            </div>
          </div>

          <div className="text-sm flex flex-row place-self-center ">
            <span> {"Don't have an account?"} </span>
            <Link className="text-sm place-self-center" href={"/sign-in"}>
              <span className="underline ml-1">Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
