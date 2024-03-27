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
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [parentCategory, setParentCategory] = useState<string>("");
  const [propertiesValue, setPropertiesValue] = useState<string[]>([]);

  useEffect(() => {
    axios.get("/api/dashboard/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

 
  const form = useForm<z.infer<typeof CategoryValidation>>({
    resolver: zodResolver(CategoryValidation),
    defaultValues: {
      name: "",
      parent: "",
      properties: [],
    },
  });

  useEffect(() => {
    // Thực hiện các thay đổi giao diện 
    console.log('Properties changed:', propertiesValue);
  }, [propertiesValue]);
  

  const onSubmit = async (values: z.infer<typeof CategoryValidation>) => {
    values.parent = parentCategory;
    await axios.post("/api/dashboard/categories", values);
    router.push("/dashboard");
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

          <Button
            type="button"
            onClick={() => {
              form.setValue("properties", [...form.getValues().properties, ""]);
              setPropertiesValue([...form.getValues().properties, ""]);
            }}
          >
            Add properties
          </Button>
          {form
            .getValues()
            .properties.map((property: string, index: number) => {
              return (
                  <FormField
                    control={form.control}
                    name={`properties.${index}`}
                    key={index}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Property {index + 1}</FormLabel>
                        <FormControl>
                          <div className="flex space-x-2">
                            <Input
                              width={400}
                              className="w-full"
                              placeholder="property"
                              {...field}
                            />
                            <Button
                              type="button" 
                              className="bg-red-500 font-semibold"
                              onClick={() => {
                                form.setValue("properties", form.getValues().properties.filter((_, i) => i !== index));
                                setPropertiesValue(form.getValues().properties.filter((_, i) => i !== index))
                              }}
                            >
                              Remove                         
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
              );
            })}


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
                      setParentCategory(e.target.value);
                    }}
                    name="parent"
                    id=""
                  >
                    <option value="0">No parent category</option>
                    {categories.length > 0 &&
                      categories.map((category, index) => {
                        return (
                          <option key={index} value={category._id}>
                            {category.name}
                          </option>
                        );
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
