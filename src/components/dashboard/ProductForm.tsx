"use client";

import { ProductValidation } from "@/lib/validations/product";
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
import { signOut } from "next-auth/react";

const ProductForm = () => {
  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      name: "",
      description: "",
      productSpecs: {},
      // category: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductValidation>) => {
    await axios.post("/api/dashboard/products", values);
  };

  return (
    <div className="">
      <h1 className="py-4">Add new Product</h1>
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
                    width={400}
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
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Input
                    width={400}
                    className="w-full"
                    placeholder="name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="productSpecs"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    width={400}
                    className="w-full"
                    placeholder="name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          /> */}
{/* 
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>category</FormLabel>
                <FormControl>
                  <Input
                    width={400}
                    className="w-full"
                    placeholder="category"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          /> */}

          <Button type="submit">Submit</Button>
          <Button type="button" onClick={() => signOut()}>logout</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
