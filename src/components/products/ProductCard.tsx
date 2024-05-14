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
    <div className="group flex flex-col gap-y-2 max-w-[15rem]" onClick={props.onClick}>
      <div className="relative flex items-center justify-center max-w-[15rem] min-w-[15rem] max-h-[22rem] min-h-[22rem] bg-[#F2F2F2] overflow-hidden cursor-pointer">
        <Image
          width={40}
          height={40}
          className="place-self-center max-w-[12rem] min-w-[12rem] bg-cover hover:scale-110 transition-all duration-300"
          src={props.image}
          loader={({ src }) => src}
          alt="controller-image"
        ></Image>
      </div>
      <div className="flex flex-col gap-y-1 group-hover:underline cursor-pointer">
        <h1 className="font-semibold text-wrap">{props.name}</h1>
          {/* <h1>{props.description}</h1> */}
          {/* currency symbol in the right of price */}
          {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.price)}
      </div>
    </div>
  );
}
