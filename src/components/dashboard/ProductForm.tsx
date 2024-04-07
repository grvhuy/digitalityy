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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ReactSortable } from "react-sortablejs";
import * as z from "zod";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";


const ProductForm = ({
  _id,
  name: existingName,
  description: existingDescription,
  price: existingPrice,
  category: existingCategory,
  productSpecs: existingSpecs,
  images: existingImages,
  quantity: existingQuantity
}: {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  productSpecs?: [];
  images?: [];
  quantity?: number;
}) => {
  const router = useRouter();

  const [name, setName] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [ images, setImages ] = useState<any[]>(existingImages || []);
  const [price, setPrice] = useState<number>(existingPrice || NaN);
  const [category, setCategory] = useState<any>(existingCategory || "");
  const [categories, setCategories] = useState<any[]>([]);
  const [specs, setSpecs] = useState<any[]>(existingSpecs || []);
  const [productProps, setproductProps] = useState<any[]>(existingSpecs?.map((item:any) => item.attributeName) || []);
  const [productPropsValue, setproductPropsValue] = useState(existingSpecs?.map((item:any) => item.attributeValue) || []);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [ files, setFiles ] = useState<any[]>([]);
  const [ quantity, setQuantity ] = useState(existingQuantity || 0);

  useEffect(() => {
    axios.get("/api/dashboard/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

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
      quantity: quantity,
      categoryName: category || "",
      productSpecs: specs,
      images: images,
    },
  });

  


  const onSubmit = async (values: z.infer<typeof ProductValidation>) => {
    values.productSpecs = specs;
    values.images = images;
    if (_id) {
      await axios.put(`/api/dashboard/products/${_id}`, values);
    } else {
      await axios.post("/api/dashboard/products", values)
        .then((res) => {
          console.log('res:' ,res.data);
        })
    }
  };


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setFiles(filesArray);
      setImages(filesArray.map((file) => URL.createObjectURL(file)));
    }
  }

  useEffect(() => {
    console.log('images: ', images);
  }, [images])

  async function uploadImages(e: any) {
    e.preventDefault();
    if (!files || files.length === 0) return;
  
    setIsUploading(true);
    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append("files", file);
    });
  
    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });
  
      await response.json()
        .then((data) => {
          setImages(data.uploadedFileNames)
      });
      setIsUploading(false);
      return images;
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  }

  function updateImageOrder(images:any) {
    setImages(images);
  }

  return (
    <div className="mt-4 w-full m-4">
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
                    placeholder="description"
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
            name="images"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Images</FormLabel>
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
                      <div>Upload images</div>
                      <input multiple name="image" type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                    <Button type="button" onClick={(e) => {
                      uploadImages(e).then((result) => {
                        field.onChange(result)
                      })
                    }}>Upload</Button>
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
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="quantity"
                    type="number"
                    value={field.value} // Sử dụng field.value thay vì price
                    onChange={(e) => {
                      const newValue = parseFloat(e.target.value);
                      field.onChange(newValue); // Kích hoạt hàm onChange của field và truyền giá trị mới
                      setQuantity(newValue);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={() => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <div>
                    <select
                      value={category}
                      onChange={async (e) => {
                        const newCategory = e.target.value; //Id cua category
                        axios.get(`/api/dashboard/categories/${newCategory}`).then((result) => {
                          console.log(result.data);
                          setproductProps(result.data.properties);
                        })
                        const newCategoryName = categories.find(
                          (item) => item.properties === newCategory
                        );
                        setCategory(newCategoryName);
                        form.setValue("category", newCategory);
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
                          <option key={index} value={category._id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>

                    {productProps.map((item, index) => (
                      <div className="space-y-4">
                        <h1 className="mt-6">{item}</h1>
                        <Input
                          className=""
                          placeholder="attribute value"
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
