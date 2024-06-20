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
import { useRouter } from "next/navigation";
import { DynamicFilters } from "../DynamicFilters";
import { TFilter, filtersConfig } from "@/lib/features/filter";
import { Button } from "../ui/button";
import { SkeletonCard } from "../categories/SkeletonCard";

type TSpecs = {
  attributeName: string;
  attributeValue: string;
}

export default function ProductsListing({
  params,
}: {
  params: { categoryId: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryProducts, setProducts] = useState<any[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [filters, setFilters] = useState<TFilter[]>([]);
  const [filterSpecs, setFilterSpecs] = useState<TSpecs[]>([]); // categoryName, categoryId, specName, specValue
  useEffect(() => {
    console.log(filters)
  }, [
    filters
  ]);

  useEffect(() => {
    axios.get("/api/collections/" + params.categoryId).then((result) => {
      setProducts(result.data.products);
      setProductsFiltered(result.data.products);
      setCategoryName(result.data.category.name);
      setIsLoading(false);
      // console.log("cate name: ", result.data.category.name);
    });
  }, [params.categoryId]);

  useEffect(() => {
    filtersConfig.category.forEach((item) => {
      // console.log("item name: ", item.name);
      if ((item.name === categoryName)) {
        setFilters(item.filters);
      }
    });
  }, [categoryName]);

  const handlePriceFilter = (value: any) => {
    let sortedProducts = [...categoryProducts];
    if (value === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProductsFiltered(sortedProducts);
  };

  const handleFilterSpec = (name: any, value: any) => {
    if (value === "all") {
      setFilterSpecs((prev) =>
        prev.filter((spec) => spec.attributeName !== name)
      );
      return;
    }
    setFilterSpecs((prev) => 
      prev.filter((spec) => spec.attributeName !== name).concat({
        attributeName: name,
        attributeValue: value,
      })
    );
    console.log(filterSpecs)
  };

  const handleFilter = async () => {
    await axios.post("/api/filter", {
      categoryId: params.categoryId,
      filterSpecs: filterSpecs,
    }).then((result) => {
      setProductsFiltered(result.data);
      console.log(result.data);
    });
  }

  return (
    <div className="flex flex-wrap flex-col gap-y-5 my-5">
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          {/* Filter api */}
          <div className="flex space-x-2">
            {filters.map((item, index) => {
              const handleValueChange = (value: any) =>
                handleFilterSpec(item.name, value);
              return (
                <Select key={index} onValueChange={handleValueChange} >
                  <SelectTrigger className="w-[108px]">
                    <SelectValue id={item.name} placeholder={item.label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>{item.label}</SelectLabel> */}
                      <SelectItem value="all">All</SelectItem>
                      {item.options.map((option) => {
                        return (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            })}
            {!isLoading && <Button onClick={handleFilter} type="button" variant="gold_black">
              Filter
            </Button>}
          </div>
        </div>
      </div>
      <div className="flex flex-row place-self-center gap-x-5">
        <div className="flex items-center space-x-2">
          <Switch id="instock-switch" />
          <Label className="font-semibold" htmlFor="instock-switch">
            In Stock
          </Label>
        </div>
        {/* <Select
          onValueChange={() => {
            if (
              document.getElementById("brand-select")?.textContent ===
              "All Brands"
            ) {
              setProductsFiltered(categoryProducts);
              return;
            }
            setProductsFiltered(
              categoryProducts.filter(
                (item) =>
                  item.brand ===
                  document.getElementById("brand-select")?.textContent
              )
            );
            // console.log(document.getElementById("brand-select")?.textContent)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue id="brand-select" placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Brand</SelectLabel>
              <SelectItem value="all">All Brands</SelectItem>
              {categoryProducts.map((item) => {
                if (item.brand === "" || item.brand === undefined) {
                  return;
                }
                return (
                  <SelectItem key={item._id} value={item.brand}>
                    {item.brand}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select> */}
        <Select>
          <SelectTrigger id="name-select" className="w-[180px]">
            <SelectValue placeholder="Sort by Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Sort by Name</SelectLabel> */}
              <SelectItem value="a-z">A to Z</SelectItem>
              <SelectItem value="z-a">Z to A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={handlePriceFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue id="price-select" placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Price</SelectLabel> */}
              <SelectItem value="low-high">Low to High</SelectItem>
              <SelectItem value="high-low">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 gap-x-5 gap-y-10 mx-36">
        {isLoading && <SkeletonCard length={10} />}
        {productsFiltered.map((item) => {
          return (
            <ProductCard
              image={item.images[0]}
              key={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              onClick={() => router.push("/products/" + item._id)}
            />
          );
        })}
      </div>
    </div>
  );
}
