"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoriesCard from "./CategoriesCard";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { SkeletonCard } from "./SkeletonCard";

export default function CategoriesListing() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    axios.get("/api/dashboard/categories").then((result) => {
      setCategories(result.data);
      setIsLoading(false);
      console.log(result.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-x-5 gap-y-10 mx-36">
      {isLoading && <SkeletonCard length={10} />}
      {categories.map((item) => {
        return (
          <CategoriesCard
            key={item._id}
            name={item.name}
            images={item.images}
            onClick={() => router.push("/categories/" + item._id)}
          />
        );
      })}
    </div>
  );
}
