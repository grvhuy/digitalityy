"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HorizontalCategoryCard from "./HorizontalCategoryCard";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "./SkeletonCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function HorizontalCategories() {
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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
      <Carousel responsive={responsive}>
        {categories.map((item) => {
          return (
            <HorizontalCategoryCard
              key={item._id}
              name={item.name}
              images={item.images}
              onClick={() => router.push("/categories/" + item._id)}
            />
          );
        })}
      </Carousel>
  );
}
