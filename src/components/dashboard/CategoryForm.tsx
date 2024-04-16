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
import Image from "next/image";

const CategoryForm = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [parentCategory, setParentCategory] = useState<string>("");
  const [propertiesValue, setPropertiesValue] = useState<string[]>([]);
  const [file, setFile] = useState(null);
  const [ files, setFiles ] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');



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
      images: "",
    },
  });

  useEffect(() => {
    // Thực hiện các thay đổi giao diện
    console.log("Properties changed:", propertiesValue);
  }, [propertiesValue]);



  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setFiles(filesArray);
      setImageUrl(URL.createObjectURL(filesArray[0]));
    }
  }

  const handleUpload = async (e: any) => {  
    e.preventDefault();
    if (!files || files.length === 0) return;
  
    setIsUploading(true);
    const formData = new FormData();
    files.forEach((file: any) => {
      formData.append("files", file);
    });
    
    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });
  
      await response.json()
        .then((data) => {
          console.log("data", data.uploadedFileNames[0]);
          setImageUrl(data.uploadedFileNames[0])
      });
      setIsUploading(false);
      return imageUrl;
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof CategoryValidation>) => {
    values.parent = parentCategory;
    values.images = imageUrl;
    await axios.post("/api/dashboard/categories", values)
      .then((result) => {
        console.log("result", result);
      });
    // router.push("/dashboard");
  };

  return (
    <div className="mt-4 w-full m-4">
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
            name="images"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Photos</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    {imageUrl && <img src={imageUrl} className="h-32 w-32 rounded-lg"/>}
                    <label className="mr-2 border w-24 h-24 bg-gray-300 rounded-md flex items-center text-center">
                      <div>Upload images</div>
                      <input
                        multiple
                        name="image"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <Button
                      type="button"
                      onClick={handleUpload}
                    >
                      Attach
                    </Button>
                  </div>
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
                              form.setValue(
                                "properties",
                                form
                                  .getValues()
                                  .properties.filter((_, i) => i !== index)
                              );
                              setPropertiesValue(
                                form
                                  .getValues()
                                  .properties.filter((_, i) => i !== index)
                              );
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
