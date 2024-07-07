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
  discount?: number;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div
      className="p-1 mb-2 group flex flex-col gap-y-1 w-64"
      onClick={props.onClick}
    >
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
                  props.discount
                    ? Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(props.price)
                    : Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(props.price)
                }
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">
                  {
                    // discount
                    props.discount
                      ? Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          props.price + props.price * (props.discount / 100)
                        )
                      : Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(props.price)
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
  );
}
