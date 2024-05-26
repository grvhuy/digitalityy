import Image from "next/image";
import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
  onClick?: React.MouseEventHandler;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className=" p-2 mb-2 group flex flex-col gap-y-2 max-w-[15rem]" onClick={props.onClick}>
      <div className="border rounded-sm relative flex items-center justify-center max-w-[15rem] min-w-[15rem] max-h-[15rem] min-h-[15rem] overflow-hidden cursor-pointer">
        <Image
          width={300}
          height={300}
          className="place-self-center max-w-[15rem] min-w-[15rem] bg-cover hover:scale-110 transition-all duration-300"
          src={props.image}
          loader={({ src }) => src}
          alt="controller-image"
          // fill
        ></Image>
      </div>
      <div className="px-1 flex flex-col  group-hover:underline cursor-pointer">
        <h2  className="text-sm font-semibold text-wrap line-clamp-2">{props.name}</h2>
          {/* <h1>{props.description}</h1> */}
          {/* currency symbol in the right of price */}
          {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.price)}
      </div>
    </div>
  );
}
