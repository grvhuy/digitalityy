"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";
import { Checkbox } from "../ui/checkbox";

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

  const handleForgot = () => {
    router.push("/forgot-password");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
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
  };

  return (
    <div className="w-96 flex flex-col gap-y-5 absolute inset-y-0 right-1/4 justify-center">
      <div>
        <div className="flex flex-row">
          <h1 className="text-4xl font-extrabold">Welcome</h1>
          <span className="text-3xl ml-2 animate-waving-hand origin-[70%_70%]">
            👋
          </span>
        </div>
        <p className="text-sm font-extralight">Please signin here</p>
      </div>

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
        <div className="flex flex-row ">
          <div className="flex flex-row gap-2 leading-none">
            <Checkbox id="terms1" className="transition-all duration-300" />
            <label
              htmlFor="terms1"
              className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Link
            href={"/forgot-password"}
            className="absolute right-0 place-self-center text-sm hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Button
          className="mt-4 rounded-m font-bold cursor-pointer"
          variant={"dark"}
        >
          Sign In
        </Button>
        <h1 className="text-center font-semibold">Or</h1>
        <div className="items-center justify-center">
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
              onClick={() => signIn("facebook")}
              className="mt-4 rounded-md bg-eerie_black text-white font-bold cursor-pointer px-6 py-2"
            >
              <IoLogoFacebook size={20} className="mx-2" />
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
        <div className="text-sm flex flex-row place-self-center ">
          <span> {"Don't have an account?"} </span>
          <Link className="text-sm place-self-center" href={"/sign-up"}>
            <span className="underline ml-1">Sign Up</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
