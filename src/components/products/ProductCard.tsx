import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
  onClick?: React.MouseEventHandler;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className="p-1 mb-2 group flex flex-col gap-y-1 w-64">
      <div className="bg-white border hover:scale-105 hover:shadow-xl duration-500 rounded-xl select-none">
        <a href="#">
          <img
            src={
              // image
              props.image
            }
            alt="Product image"
            className="h-60 w-full object-cover rounded-t-xl"
          />
        </a>
        <div className="px-4 py-3">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {
              // category
            }
          </span>
          <p className="text-normal font-bold text-black truncate block capitalize">
            {
              // name
              props.name
            }
          </p>
          <div>
            <div className="flex  items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                {
                  // price
                  Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(props.price)
                }
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">
                  {
                    // discount
                    Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(props.price + 100000)
                  }
                </p>
              </del>
            </div>
            <div className="text-right">
              <Button variant="gold_black" onClick={props.onClick}>
                View Details
              </Button>
            </div>
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
