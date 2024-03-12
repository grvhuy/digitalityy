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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({message:"Invalid email address"}),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email:"",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-x-2">
      <p className="text-4xl font-extrabold">Welcome</p>
      <p className="text-sm">Please signin here</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <div>
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="random@gmail.com" {...field} />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div>
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <Button variant={"outline"} type="submit">
            Signup
          </Button>
        </form>
      </Form>
    </div>
  );
}
