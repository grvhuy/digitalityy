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
import { CategoryValidation } from "@/lib/validations/category";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryForm = () => {

  const pathname = usePathname()
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [parentCategory, setParentCategory] = useState<string>('')

  useEffect(() => {
    axios.get("/api/dashboard/categories")
      .then(result => {
        setCategories(result.data)
      })
  }, [])

  const form = useForm<z.infer<typeof CategoryValidation>>({
    resolver: zodResolver(CategoryValidation),
    defaultValues: {
      name: "",
      description: "",
      parent: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof CategoryValidation>) => {
    values.parent = parentCategory
    await axios.post("/api/dashboard/categories", values)
    router.push("/dashboard")
  };

  return (
    <div className="">
      <h1 className="py-4">Add new Category</h1>
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
                    className=""
                    placeholder="description"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parent"
            render={({ field }) => (
              <FormItem className="space-y-2 flex flex-col">
                <FormLabel>Parent</FormLabel>
                <FormControl>
                  <select 
                    {...field}
                    value={parentCategory} 
                    onChange={(e) => {
                      setParentCategory(e.target.value)
                    }}
                    name="parent" 
                    id="">
                   <option value="0">No parent category</option>

                    {categories.length > 0 && categories.map((category, index) => {
                      return (
                        <option key={index} value={category._id}>{category.name}</option>
                      )
                    })}
                  </select>
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

export default CategoryForm;
