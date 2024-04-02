"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ProductsListingProps {
  item: React.ComponentType;
}
export default function ProductsListing() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    axios.get("/api/dashboard/products").then((result) => {
      setProducts(result.data);
    });
  }, []);
  return (
    <div className="flex flex-wrap flex-col gap-y-5 my-5">
      <div className="flex flex-row place-self-center gap-x-5">
        <div className="flex items-center space-x-2">
          <Switch id="instock-switch" />
          <Label className="font-semibold" htmlFor="instock-switch">
            In Stock
          </Label>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Brand</SelectLabel>
              <SelectItem value="amd">AMD</SelectItem>
              <SelectItem value="intel">Intel</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Size</SelectLabel>
              <SelectItem value="full">{"Full"}</SelectItem>
              <SelectItem value="tkl">TKL</SelectItem>
              <SelectItem value="75%">{"75%"}</SelectItem>
              <SelectItem value="65%">{"65%"}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Price</SelectLabel>
              <SelectItem value="low-high">Low to High</SelectItem>
              <SelectItem value="high-low">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap flex-row gap-x-5 mx-48">
        {products.map((item) => {
          return (
            <ProductCard
              key={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
}
