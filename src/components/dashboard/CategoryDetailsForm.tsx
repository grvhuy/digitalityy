"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { CategoryValidation } from "@/lib/validations/category";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CategoryDetailsForm = (
  {
    _id,
    name: existingName,
    parent: existingParent,
    properties: existingProperties,
    images: existingImages,
  } : {
    _id?: string;
    name?: string;
    parent?: string;
    properties?: string[];
    images?: string[];
  }
) => {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]); //Fetch cho the select

  const [parentCategory, setParentCategory] = useState<string>(existingParent || "");
  const [propertiesValue, setPropertiesValue] = useState<string[]>(existingProperties || []);
  const [ categoryName , setCategoryName ] = useState<string>(existingName || "");
  const [ image , setImage ] = useState<string[]>(existingImages || []); //Anh category 

  const [file, setFile] = useState(null);
  const [ files, setFiles ] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(existingImages ? existingImages[0] : "");



  useEffect(() => {
    axios.get("/api/dashboard/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  const form = useForm<z.infer<typeof CategoryValidation>>({
    resolver: zodResolver(CategoryValidation),
    defaultValues: {
      name: categoryName || "",
      parent: parentCategory || "",
      properties: propertiesValue || [],
      images: imageUrl || "",
    },
  });

  //upload anh local
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
    console.log("values", values);
    const response = await axios.patch(`/api/dashboard/categories/${_id}`, values);
    console.log("response", response);
    router.push("/dashboard/categories")
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
                    value={categoryName}
                    placeholder="name"
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                      form.setValue("name", e.target.value);
                    }}
                    // {...field}  
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={() => (
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
              if (propertiesValue.length === 0) {
                setPropertiesValue([""]);
                form.setValue("properties", [""]);
              } else {
                form.setValue("properties", [...propertiesValue, ""]);
                setPropertiesValue([...propertiesValue, ""]);
              }
            }}
          >
            Add properties
          </Button>
          <FormField 
            control={form.control}
            name="properties"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Properties</FormLabel>
                <FormControl>
                  <>
                  <div className="grid grid-cols-2">
                    {propertiesValue.map((property, index) => {
                      return (
                          <div key={index} className="flex  space-x-1 my-2 mx-2">
                            <Input
                              className="w-full"
                              placeholder="property"
                              value={property}
                              onChange={(e) => {
                                const newProperties = [...propertiesValue];
                                newProperties[index] = e.target.value;
                                setPropertiesValue(newProperties);
                                form.setValue("properties", newProperties);
                              }}
                            />
                            <Button
                              type="button"
                              className="bg-red-500 font-semibold"
                              onClick={() => {
                                const newProperties = propertiesValue.filter(
                                  (_, i) => i !== index
                                );
                                setPropertiesValue(newProperties);
                                form.setValue("properties", newProperties);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                      );
                    })}
                    </div>
                  </>
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
                      setParentCategory(e.target.value);
                    }}
                    name="parent"
                    id=""
                  >
                    {parentCategory ? (
                      <option value={parentCategory}>{parentCategory}</option>
                
                    ) : (
                      <option value="0">No parent category</option>
                    
                    )}
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

          <Button className="w-[180px] mx-2" type="submit">Publish</Button>
          <Button className="w-[180px] mx-2" type="button" variant="outline" onClick={() => router.push("/dashboard/categories")}>Cancel</Button>

        </form>
      </Form>
    </div>
  );
};

export default CategoryDetailsForm;
