"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Router, { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgotPassword() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-96 flex flex-col gap-y-5 absolute inset-y-0 right-1/4 justify-center">
      <div>
        <Button
          onClick={handleBack}
          variant="outline"
          size="icon"
          className="my-2"
        >
          <MdOutlineKeyboardArrowLeft className="h-4 w-4" />
        </Button>
        <p className="text-4xl font-extrabold whitespace-nowrap">
          Forgot Password
        </p>
        <p className="text-sm font-extralight">
          {
            "Enter your registered email address. We'll send you a code to reset your password."
          }
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div>
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <Button variant={"dark"} type="button">
            Send code
          </Button>
        </form>
      </Form>
    </div>
  );
}
