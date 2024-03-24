import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ProductImagesSlider from "../product-images-slider/ProductImagesSlider";

interface ProductCardProps {
  name: string;
  price: number;
}

export default function ProductDetails(props: ProductCardProps) {
  const images = ["/images/6.png", "/images/abcd.png", "/images/test-img.png"];

  return (
    <div className="h-screen w-screen grid grid-cols-2 gap-x-24 p-48">
      <ProductImagesSlider props={images}></ProductImagesSlider>
      <div className="flex flex-col justify-self-center w-full h-full">
        <h1 className="text-wrap text-4xl">{props.name}</h1>
        <h1 className="mt-4 text-2xl text-red-400">
          {"$"}
          {props.price}
        </h1>
        <Separator className="my-2" />
      </div>
    </div>
  );
}
