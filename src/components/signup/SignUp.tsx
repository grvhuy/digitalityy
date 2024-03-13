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
import { UserValidation } from "@/lib/validations/user";
import axios from "axios";



export default function SignUp() {
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      email:"",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    await axios.post("/api/register", values).then((res) => {
      console.log(res);
    });
  }

  return (
    <div className="flex flex-col gap-x-2">
      <p className="text-4xl font-extrabold">Welcome</p>
      <p className="text-sm">Please signin here</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            SignUp
          </Button>
        </form>
      </Form>
    </div>
  );
}
