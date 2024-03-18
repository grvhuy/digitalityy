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
import { on } from "events";

const ProductForm = ({
  _id,
  name: existingName,
  description: existingDescription,
  price: existingPrice,
  category: existingCategory,
  productSpecs: existingSpecs,
}: {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  productSpecs?: [];
}) => {
  const [name, setName] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState<number>(existingPrice || NaN);
  const [category, setCategory] = useState(existingCategory || "");
  const [categories, setCategories] = useState<any[]>([]);
  const [specs, setSpecs] = useState<any[]>(existingSpecs || []);
  const [productProps, setproductProps] = useState<any[]>([]);
  const [productPropsValue, setproductPropsValue] = useState(
    Array(productProps.length).fill("")
  );

  useEffect(() => {
    if (!_id) {
      axios.get("/api/dashboard/categories").then((result) => {
        setCategories(result.data);
        // console.log(result.data);
      });
    }
  }, []);

  useEffect(() => {
  // Tạo mới specs khi productProps hoặc productPropsValue thay đổi
  const newSpecs = productProps.map((item, index) => ({
    attributeName: item,
    attributeValue: productPropsValue[index],
  }));
  setSpecs(newSpecs);
  form.setValue("productSpecs", specs);
  // console.log(specs);
}, [productProps, productPropsValue]);



  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      name: name || "",
      description: description || "",
      price: price || NaN,
      category: category || "",
      productSpecs: specs,
    },
  });


  const onSubmit = async (values: z.infer<typeof ProductValidation>) => {
    console.log(specs);
    values.productSpecs = specs;
    if (_id) {
      await axios.put(`/api/dashboard/products/${_id}`, values);
    } else {
      await axios.post("/api/dashboard/products", values);
    }
  };

  const handleClick = () => {
    // Hàm này sẽ được gọi khi bạn click vào button
    // Không cần phải tái sử dụng đoạn mã tạo specs ở đây vì nó đã được xử lý trong useEffect
    console.log(specs); // Log specs sau khi đã được cập nhật
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
                  <Input placeholder="name" {...field} />
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
                    value={description}
                    onChange={(e) => {
                      const newDescription = e.target.value;
                      setDescription(newDescription);
                      field.onChange(e);
                    }}
                    // {...field}
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
                    placeholder="price"
                    type="number"
                    value={field.value} // Sử dụng field.value thay vì price
                    onChange={(e) => {
                      const newValue = parseFloat(e.target.value); 
                      field.onChange(newValue); // Kích hoạt hàm onChange của field và truyền giá trị mới
                      setPrice(newValue); 
                      console.log(newValue);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Hien thi prod specs trong details */}
          <FormField
            control={form.control}
            name="productSpecs"
            render={({ field }) => (
              <FormItem className="space-y-4">
                {existingSpecs &&
                  specs.map((item: any) => (
                    <div>
                      <h1>{item.attributeName}</h1>
                      <h1>{item.attributeValue}</h1>
                    </div>
                  ))}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <div>
                    <select
                      value={category}
                      onChange={(e) => {
                        const newCategory = e.target.value;
                        // console.log(newCategory);
                        const newCategoryName = categories.find(
                          (item) => item.properties === newCategory
                        );
                        setCategory(newCategoryName?.name);
                        setproductProps(newCategory.split(","));
                      }}
                      name="category"
                      id=""
                    >
                    <option value="0">No category</option>
                      {categories.length > 0 &&
                        categories.map((category, index) => {
                          return (
                            <option key={index} value={category.properties}>
                              {category.name}
                            </option>
                          );
                        })}
                    </select>

                    {productProps.map((item, index) => (
                      <div className="space-y-4">
                        <h1>{item}</h1>
                        <Input
                          placeholder="attributeValue"
                          value={productPropsValue[index]}
                          onChange={
                            (e) => {
                              const newProductPropsValue = [...productPropsValue];
                              newProductPropsValue[index] = e.target.value;
                              setproductPropsValue(newProductPropsValue);
                              // console.log(newProductPropsValue);
                          }} // Pass index để biết là giá trị nào đang thay đổi
                        />
                      </div>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

                    

      {/* <FormField 
        control={form.control}
        name="productSpecs"
        render={({ field }) => (
          <FormItem className="space-y-4">
            {productProps.map((item, index) => (
              <div key={index}>
                <h1>{item}</h1>
                <Input
                  placeholder="attributeValue"
                  value={productSpecs[index]?.attributeValue || ""}
                  onChange={
                      (e) => {
                      const newProductPropsValue = [...productPropsValue];
                      newProductPropsValue[index] = e.target.value;
                      setproductPropsValue(newProductPropsValue);
                      console.log(newProductPropsValue);
                  }}
                />
              </div>
            ))}
          </FormItem>
        )}
      /> */}

          <Button type="button" onClick={() => {
            handleClick();
          }}>Set Specification</Button>

          <Button type="submit">Add Product</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
