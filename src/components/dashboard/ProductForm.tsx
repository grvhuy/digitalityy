"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { ProductValidation } from "@/lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ReactSortable } from "react-sortablejs";
import * as z from "zod";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { uploadToS3 } from "@/lib/s3-upload";


const ProductForm = ({
  _id,
  name: existingName,
  description: existingDescription,
  price: existingPrice,
  category: existingCategory,
  productSpecs: existingSpecs,
  images: existingImages,
}: {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  productSpecs?: [];
  images?: [];
}) => {
  const router = useRouter();

  const [name, setName] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [ images, setImages ] = useState<any[]>(existingImages || []);
  const [price, setPrice] = useState<number>(existingPrice || NaN);
  const [category, setCategory] = useState<any>(existingCategory || "");
  const [categories, setCategories] = useState<any[]>([]);
  const [specs, setSpecs] = useState<any[]>(existingSpecs || []);
  const [productProps, setproductProps] = useState<any[]>([]);
  const [productPropsValue, setproductPropsValue] = useState(
    Array(productProps.length).fill("")
  );
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get("/api/dashboard/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  useEffect(() => {
    // console.log(images);
  }, [images]);

  useEffect(() => {
    // Tạo mới specs khi productProps hoặc productPropsValue thay đổi
    const newSpecs = productProps.map((item, index) => ({
      attributeName: item,
      attributeValue: productPropsValue[index],
    }));
    setSpecs(newSpecs);
    form.setValue("productSpecs", specs);
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
    router.push("/dashboard/products");
  };


  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

async function uploadImages(e: any) {
  e.preventDefault();
  if (!file) return;

  setIsUploading(true);
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/s3-upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data.status);
    setIsUploading(false);
  } catch (error) {
    console.log(error);
    setIsUploading(false);
  }
}


  const handleUpload = async (event:any) => {
    const files = event.target.files;
    if (files) {
      const newImages = [...images];
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('file', file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageDataURL = e.target?.result;
          newImages.push(imageDataURL);
          setImages(newImages);
        };
        reader.readAsDataURL(file);
      }     
      console.log(formData);

    }
  };
  function updateImageOrder(images:any) {
    setImages(images);
  }

  return (
    <div className="mt-4 w-1/2">
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="name"
                    value={description}
                    onChange={(e) => {
                      const newDescription = e.target.value;
                      setDescription(newDescription);
                      field.onChange(e);
                    }}
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
                <FormLabel>Photos</FormLabel>
                <FormControl>
                  <div>
                  <ReactSortable 
                    className='flex flex-wrap gap-1'
                    list={images} 
                    setList={updateImageOrder}
                  >
                      
                  {!!images?.length && images.map(link => (
                      <div key={link} className="h-32">
                          <img src={link} className="h-32 w-32 rounded-lg"/>
                      </div>
                  ))}                                   
                  </ReactSortable>
                    {isUploading && (
                      <div className="h-24 flex items-center">
                        <Spinner />
                      </div>
                    )}

                    <label className="border w-24 h-24 bg-gray-300 rounded-md flex items-center text-center">
                      <div>Upload photos</div>
                      <input name="image" type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                    <Button onClick={uploadImages}>Upload</Button>
                  </div>
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
                        const newCategoryName = categories.find(
                          (item) => item.properties === newCategory
                        );
                        setCategory(newCategoryName?.name);
                        setproductProps(newCategory.split(","));
                      }}
                      name="category"
                      id=""
                    >
                      {category ? (
                        <option value={category}>{category.name}</option>
                      ) : (
                        <option value="">Select a category</option>
                      )}
                      {categories.map((category, index) => {
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
                          onChange={(e) => {
                            const newProductPropsValue = [...productPropsValue];
                            newProductPropsValue[index] = e.target.value;
                            setproductPropsValue(newProductPropsValue);
                          }} // Pass index để biết là giá trị nào đang thay đổi
                        />
                      </div>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-row-reverse space-x-4">
            <Button
              className="ml-2"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
