"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { set } from "mongoose";
import { BrandValidation } from "@/lib/validations/brand";
import { Textarea } from "../ui/textarea";

const BrandForm = () => {
  const router = useRouter();

 
  const form = useForm<z.infer<typeof BrandValidation>>({
    resolver: zodResolver(BrandValidation),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  

  const onSubmit = async (values: z.infer<typeof BrandValidation>) => {
    await axios.post("/api/dashboard/brands", values);
    router.push("/dashboard/brands");
  };

  return (
    <div className="">
      <h1 className="py-4">Brand</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full"
                    placeholder="name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default BrandForm;
