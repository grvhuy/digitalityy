"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { TFilter, filtersConfig } from "@/lib/features/filter";
import { Button } from "../ui/button";
import { SkeletonCard } from "../categories/SkeletonCard";
import { Pagination } from "../Pagination";

type TSpecs = {
  attributeName: string;
  attributeValue: string;
};

export default function SearchProducts({ params }: { params: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [productsFiltered, setProductsFiltered] = useState<any[]>([]);
  const [filters, setFilters] = useState<TFilter[]>([]);
  const [filterSpecs, setFilterSpecs] = useState<TSpecs[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 4;

  const handleSearch = async (value: string) => {
    const response = await axios.get(`/api/search?keyword=${value}`);
    setProductsFiltered(response.data);
    console.log(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(params);
    handleSearch(params);
  }, [params]);

  useEffect(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    setSearchResults(productsFiltered.slice(start, end));
  }, [productsFiltered, currentPage]);

  const handlePriceFilter = (value: any) => {
    let sortedProducts = [...productsFiltered];
    if (value === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProductsFiltered(sortedProducts);
  };

  const handleABCFilter = (value: any) => {
    let sortedProducts = [...productsFiltered];
    if (value === "a-z") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "z-a") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
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
      prev
        .filter((spec) => spec.attributeName !== name)
        .concat({
          attributeName: name,
          attributeValue: value,
        })
    );
    console.log(filterSpecs);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-wrap flex-col gap-y-5 my-5">
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <div className="flex space-x-2">
            {filters.map((item, index) => {
              const handleValueChange = (value: any) =>
                handleFilterSpec(item.name, value);
              return (
                <Select key={index} onValueChange={handleValueChange}>
                  <SelectTrigger className="w-[108px]">
                    <SelectValue id={item.name} placeholder={item.label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
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

        <Select onValueChange={handleABCFilter}>
          <SelectTrigger id="name-select" className="w-[180px]">
            <SelectValue placeholder="Sort by Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
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
              <SelectItem value="low-high">Low to High</SelectItem>
              <SelectItem value="high-low">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 gap-x-5 gap-y-10 mx-36">
        {isLoading && <SkeletonCard length={10} />}
        {searchResults.map((item) => {
          return (
            <ProductCard
              image={item?.images ? item.images[0] : ""}
              key={item?._id}
              name={item?.name}
              price={item?.price}
              description={item?.description}
              onClick={() => router.push("/products/" + item._id)}
            />
          );
        })}
      </div>
      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(productsFiltered.length / PRODUCTS_PER_PAGE)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
