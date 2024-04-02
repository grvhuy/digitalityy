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
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";

const CreateProductForm = ({
  _id,
  name: existingName,
  description: existingDescription,
  price: existingPrice,
  categoryName: existingCategory,
  productSpecs: existingSpecs,
}: {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  categoryName?: string;
  productSpecs?: [];

}) => {

  const [ name, setName ] = useState(existingName || '')
  const [ description, setDescription ] = useState(existingDescription || '')
  const [ price, setPrice ] = useState<number>(existingPrice || 0)
  const [ category, setCategory ] = useState(existingCategory || '')
  const [ specs, setSpecs ] = useState(existingSpecs || [])
  const [ categories, setCategories ] = useState<any[]>([])

  useEffect(() => {
    axios.get('api/dashboard/categories').then((res) => {
      setCategories(res.data)
    })
  }, )
  
  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      name: name || "",
      description: description || "",
      price: price,
      productSpecs: specs || [],

    },
  });

  const onSubmit = async (values: z.infer<typeof ProductValidation>) => {
    if (_id) {
      await axios.put(`/api/dashboard/products/${_id}`, values);
    } else {
      await axios.post("/api/dashboard/products", values);
    }
  };

  return (
    <div className="mt-4">
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
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // {...field}

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
                  <Textarea
                    placeholder="name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="space-y-2">
                  <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    // disabled
                    width={400}
                    placeholder="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    // {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="productSpecs"
            render={({ field }) => (
              <FormItem className="space-y-4">
                {specs.map((item: any) => (
                  <div>
                    <h1>{item.attributeName}</h1>
                    <h1>{item.attributeValue}</h1>
                  </div>
                ))}

              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    width={400}
                    placeholder="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          /> */}

          <Button type="submit">Add Product</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProductForm;
