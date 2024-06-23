import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
  onClick?: React.MouseEventHandler;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className="p-1 mb-2 group flex flex-col gap-y-1 w-auto">
      <div
        onClick={props.onClick}
      className="max-w-[20rem] min-h-[24rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <Image
            width={300}
            height={300}
            className="max-h-[14rem] p-8 rounded-t-lg group-hover:scale-105 transition-all duration-300"
            src={props.image}
            alt="product image"
            loader={({ src }) => src}
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#" className="">
            <div className="flex flex-col justify-center">
              <h5 className="group-hover:opacity-70 line-clamp-2 leading-6 text-medium font-semibold tracking-tight text-gray-900 dark:text-white">
                {props.name}
              </h5>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  5.0
                </span>
              </div>
            </div>
          </a>
          <div className="flex items-center justify-between">
            <span className="relative bottom-0 text-md font-bold text-gray-900 dark:text-white">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(props.price)}
            </span>
            <a
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View
            </a>
          </div>
        </div>
      </div>
    </div>

    // <div className=" p-2 mb-2 group flex flex-col gap-y-2 max-w-[15rem]" onClick={props.onClick}>
    //   <div className="border rounded-sm relative flex items-center justify-center max-w-[15rem] min-w-[15rem] max-h-[15rem] min-h-[15rem] overflow-hidden cursor-pointer">
    //     <Image
    //       width={300}
    //       height={300}
    //       className="place-self-center max-w-[15rem] min-w-[15rem] bg-cover hover:scale-110 transition-all duration-300"
    //       src={props.image}
    //       loader={({ src }) => src}
    //       alt="controller-image"
    //       // fill
    //     ></Image>
    //   </div>
    //   <div className="px-1 flex flex-col  group-hover:underline cursor-pointer">
    //     <h2  className="text-sm font-semibold text-wrap line-clamp-2">{props.name}</h2>
    //       {/* <h1>{props.description}</h1> */}
    //       {/* currency symbol in the right of price */}
    //       {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.price)}
    //   </div>
    // </div>
  );
}
