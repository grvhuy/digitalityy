"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

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
import { toast } from "../ui/use-toast";

const ProductForm = ({
  _id,
  name: existingName,
  description: existingDescription,
  price: existingPrice,
  // salePrice: existingSalePrice,
  category: existingCategory,
  productSpecs: existingSpecs,
  images: existingImages,
  quantity: existingQuantity,
  brand: existingBrand,
  discount: existingDiscount,
}: {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  salePrice?: number;
  category?: any;
  productSpecs?: [];
  images?: [];
  quantity?: number;
  brand?: string;
  discount?: number;
}) => {
  const router = useRouter();

  const [name, setName] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [images, setImages] = useState<any[]>(existingImages || []);
  const [price, setPrice] = useState<number>(existingPrice || 0);
  // const [salePrice, setSalePrice] = useState<number>(existingSalePrice || NaN);
  const [category, setCategory] = useState<any>(existingCategory || "");
  const [categoryName, setCategoryName] = useState<any>(existingCategory || "");
  const [categories, setCategories] = useState<any[]>([]);
  const [specs, setSpecs] = useState<any[]>(existingSpecs || []);
  const [productProps, setproductProps] = useState<any[]>(
    existingSpecs?.map((item: any) => item.attributeName) || []
  );
  const [productPropsValue, setproductPropsValue] = useState(
    existingSpecs?.map((item: any) => item.attributeValue) || []
  );
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(existingQuantity || 0);

  const [brands, setBrands] = useState<any[]>([]);
  const [brand, setBrand] = useState(existingBrand || "");
  const [variants, setVariants] = useState<any[]>([]);
  const [variant, setVariant] = useState<string>("");


  useEffect(() => {
    axios.get("/api/dashboard/categories").then((result) => {
      setCategories(result.data);
    });
    axios.get(`/api/dashboard/brands`).then((res) => {
      setBrands(res.data);
    });

    if (_id) {
      axios.get(`/api/dashboard/products/variants/${_id}`).then((res) => {
        setVariants(res.data);
        console.log("variants:", res.data);
      });
    }
  }, []);

  // useEffect(() => {
  //   if (category) {
  //     console.log("category:", category);
  //   }
  // }, [category]);

  // Cập nhật variant
  useEffect(
    () => {
      if (_id) {
        axios.get(`/api/dashboard/products/variants/${_id}`).then((res) => {
          setVariants(res.data);
          console.log("variants:", res.data);
        });
      }
    },
    [
      // variants
    ]
  );

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
      price: price || 0,
      quantity: quantity,
      categoryName: category || "",
      category: category ? category._id : "",
      productSpecs: specs,
      images: images,
      brand: brand || "",
      // salePrice: salePrice || NaN,
      discount: existingDiscount || 0,
      // variant: variants,
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductValidation>) => {
    values.productSpecs = specs;
    values.images = images;
    values.variant = variants;
    if (_id) {
      console.log("put values: ", values);
      await axios.put(`/api/dashboard/products/${_id}`, values);
    } else {
      if (name && description && price && category && images.length > 0) {
      axios.post("/api/dashboard/products", values).then((res) => {
        console.log("res:", res.data);
        if (res.data) {
          router.push(`/dashboard/products/${res.data._id}`);
        }
      });}
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
    console.log("images: ", images);
  }, [images]);

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

      await response.json().then((data) => {
        setImages(data.uploadedFileNames);
      });
      setIsUploading(false);
      return images;
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  }

  function updateImageOrder(images: any) {
    setImages(images);
  }

  return (
    <div className="mt-4 w-full m-4 pb-20">
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
                      className="flex flex-wrap gap-1"
                      list={images}
                      setList={updateImageOrder}
                    >
                      {!!images?.length &&
                        images.map((link) => (
                          <div key={link} className="h-32">
                            <img src={link} className="h-32 w-32 rounded-lg" />
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
                      <input
                        multiple
                        name="image"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <Button
                      className="mt-2"
                      type="button"
                      onClick={(e) => {
                        uploadImages(e).then((result) => {
                          field.onChange(result);
                        });
                      }}
                    >
                      Attach to Form
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
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
              name="discount"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Discount (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="discount"
                      type="number"
                      value={field.value} // Sử dụng field.value thay vì price
                      onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Quantity in inventory</FormLabel>
                <FormControl>
                  <Input
                    placeholder="sale"
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

          {/* Chon dialog chua nhieu brand */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Select
                    value={brand}
                    onValueChange={(value) => {
                      setBrand(value);
                      form.setValue("brand", value);
                      // console.log(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {brand ? brand : "Select a brand"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="w-1/2">
                      <SelectGroup className="w-1/2">
                        {/* <SelectLabel>{category.name}</SelectLabel> */}
                        {brands.map((brand: any, index: number) => (
                          <SelectItem key={index} value={brand.name}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                      className="w-1/2 block border border-gray-300 rounded-md p-2"
                      value={category}
                      defaultValue={existingCategory}
                      onChange={async (e) => {
                        const newCategory = e.target.value; //Id cua category
                        axios
                          .get(`/api/dashboard/categories/${newCategory}`)
                          .then((result) => {
                            // console.log(result.data);
                            setproductProps(result.data.properties);
                          });
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
                        <option disabled value="">
                          Select a category
                        </option>
                      )}

                      {categories.map((category, index) => {
                        return (
                          <option key={index} value={category._id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>

                    {/* <Select
                      value={category}
                      onValueChange={(value) => {
                        setCategory(value);
                        form.setValue("category", value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue>
                          {category ? category.name : "Select a category"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="w-1/2">
                        <SelectGroup className="w-1/2">
                          {categories.map((category: any, index: number) => (
                            <SelectItem key={index} value={category}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select> */}

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

          {/* Dialog variant */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="gold_black">All variants</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>All variants</DialogTitle>
                <DialogDescription>
                  Adjust the variants of the product
                </DialogDescription>
              </DialogHeader>
              <div>
                {variants.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 space-y-1"
                  >
                    <Input
                      id="link"
                      defaultValue={item.variant}
                      // readOnly
                      className=""
                    />
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          if (_id) {
                            axios
                              .delete(
                                `/api/dashboard/products/variants/${_id}/${item.variant}`
                              )
                              .then((res) => {
                                console.log("res:", res.data);
                                setVariants(res.data);
                              });
                          } else {
                            const newVariants = [...variants];
                            newVariants.splice(index, 1);
                            setVariants(newVariants);
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </DialogClose>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Variant
                  </Label>
                  <Input
                    id="link"
                    placeholder="Enter new Variant"
                    defaultValue=""
                    value={variant}
                    onChange={(e: any) => setVariant(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <Button
                  onClick={() => {
                    console.log("variants:", variants);
                    console.log("variant:", variant);
                    if (_id) {
                      axios
                        .post(`/api/dashboard/products/variants/${_id}`, {
                          variant: variant,
                        })
                        .then((res) => {
                          console.log("res:", res.data);
                          setVariants(res.data);
                        });
                    } else setVariants([...variants, { variant: variant }]);
                    setVariant("");
                  }}
                >
                  Add Variant
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex flex-row-reverse space-x-4">
            <Button
              className="ml-2"
              type="button"
              onClick={() => router.back()}
            >
              Back
            </Button>
            {_id ? (
              <Button
                onClick={() => {
                  axios
                    .patch(`/api/dashboard/products/${_id}`, form.getValues())
                    .then((res) => {
                      console.log("res:", res.data);
                      toast({
                        duration: 3000,
                        description: "Saved changed",
                      });
                    });
                }}
                type="submit"
              >
                Publish
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  if (form.formState.isSubmitting) return;
                  onSubmit(form.getValues())
                }}
                type="submit"
              >
                Add Product
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
