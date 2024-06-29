"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { BrandValidation } from "@/lib/validations/brand";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const BrandForm = ({
  _id,
  name: existingName,
  images: existingImages,
  description: existingDescription,
} : {
  _id?: string;
  name?: string;
  images?: string;
  description?: string;
}) => {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState(existingImages || "");
  const [ name, setName ] = useState(existingName || "");
  const [ description, setDescription ] = useState(existingDescription || "");

  const [ files, setFiles ] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

 
  const form = useForm<z.infer<typeof BrandValidation>>({
    resolver: zodResolver(BrandValidation),
    defaultValues: {
      name,
      description,
      images: existingImages || "",  
    },
  });

  // useEffect(() => {
  //   axios.get("/api/dashboard/brands").then((res) => {
  //     console.log(res.data);
  //   });
  // }, [])

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

  const onSubmit = async (values: z.infer<typeof BrandValidation>) => {
    if (_id) {
      await axios.put(`/api/dashboard/brands/${_id}`, {
        ...values,
        images: imageUrl,
      }).then((res) => {
        console.log(res.data);
      });
    } else {
      await axios.post("/api/dashboard/brands", {
        ...values,
        images: imageUrl,
      })
    }
    router.push("/dashboard/brands");
  };

  return (
    <div className="mt-4 w-full m-4">
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
