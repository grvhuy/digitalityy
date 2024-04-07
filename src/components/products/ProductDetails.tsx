"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@nextui-org/input";
import { Button } from "../ui/button";

export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const [images1, setImages] = useState<any[]>([]);
  const images = ["/images/6.png", "/images/abcd.png", "/images/test-img.png"];
  const [product, setProduct] = useState<any[]>([]);
  const [productSpecs, setProductspecs] = useState<any[]>([]);
  useEffect(() => {
    axios.get("/api/dashboard/products/" + params.productId).then((result) => {
      setProduct(result.data);
      setImages(result.data.images);
      setProductspecs(result.data.productSpecs);
      console.log(result.data);
      console.log(result.data.productSpecs);
    });
  }, [params.productId]);
  return (
    <div className="h-screen w-screen grid grid-cols-2 gap-x-24 px-48 py-10">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {images.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Image
                  key={index}
                  height={500}
                  width={500}
                  src={image}
                  alt={"pic from index" + { index }}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex flex-col justify-self-center w-full h-full">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <span className="mt-3 text-5xl text-red-400">${product.price}</span>
        <Separator className="my-4" />
        <ul className="list-disc">
          <h1 className="font-bold">{"Product's Specifications:"}</h1>
          {productSpecs.map((item) => {
            return (
              <li className="mt-1" key={item._id}>
                <span className="text-sm font-semibold">
                  {item.attributeName}:
                </span>
                <span className="text-base"> {item.attributeValue}</span>
              </li>
            );
          })}
        </ul>
        <Separator className="my-4" />
        <div className="flex flex-col gap-y-2">
          <label htmlFor="quantity" className="font-semibold">
            Quantity
          </label>
          <Input id="quantity" className="w-1/6" type="number" placeholder="0" />
          <Button variant={"dark"} className="mt-2 rounded-3xl w-fit">Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
