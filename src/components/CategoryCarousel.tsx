"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import { useEffect, useState } from "react";

export const CategoryCarousel = () => {

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/dashboard/categories").then((result) => {
      setCategories(result.data);
      console.log(result.data);
    });

  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-2xl mb-8">Shop by categories</h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {categories.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6 bg-[#f5f5f5]">
                    <img
                      src={item.images[0]}
                      alt="category"
                      className="w-1/2"
                    />
                    <span className="font-semibold">{item.name}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
