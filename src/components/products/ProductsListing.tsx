"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductsCard";
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
    <div className="flex flex-wrap flex-row gap-x-5">
      {products.map((item) => {
        return (
          <ProductCard key={item._id} name={item.name} price={item.price} />
        );
      })}
    </div>
  );
}
