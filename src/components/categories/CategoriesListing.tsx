"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoriesCard from "./CategoriesCard";
import { useRouter } from "next/navigation";

export default function CategoriesListing() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    axios.get("/api/dashboard/categories").then((result) => {
      setCategories(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <div className="flex flex-wrap flex-row gap-x-5 gap-y-10 mx-48">
      {categories.map((item) => {
        return (
          <CategoriesCard
            key={item._id}
            name={item.name}
            images={item.images}
            onClick={() => router.push("/api/collections/" + item._id)}
          />
        );
      })}
    </div>
  );
}
