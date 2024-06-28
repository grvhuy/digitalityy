"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import HorizontalCategories from "./HorizontalCategories";
import { useState, useEffect, useRef } from "react";
import { FaRegSmile } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { FaRegCreditCard } from "react-icons/fa";
import { Separator } from "../ui/separator";
import AuthImagesSlider from "../signin/auth_images_slider";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "0px", threshold: 0.3 }
    );
    console.log(isIntersecting);
    if (containerRef.current) observer.observe(containerRef?.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef?.current);
    };
  }, []);
  // useEffect(() => {
  //   const observer = new IntersectionObserver(callbackFunction, options);
  //   observer.observe(containerRef.current);
  //   console.log(isIntersecting);
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  return (
    <div className="h-full w-full mb-28 ">
      <div className={``}>
        <AuthImagesSlider />
      </div>
      <div className="flex flex-row">
        <div
          ref={containerRef}
          className={`min-w-full h-full min-h-[600px] duration-1000 bg-[url('/images/banner.png')] ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="min-w-full mx-64 my-36">
            <h1 className="text-4xl text-white font-semibold">
              Enhance your surrounding
            </h1>
            <p className="text-2xl mt-6 text-white">
              The new <b>G Pro X</b>.<br /> Out now.
            </p>
            <Button className="px-8 py-8 mt-6 text-2xl rounded-none bg-white text-black hover:bg-transparent hover:outline hover:outline-2 hover:outline-white hover:text-white">
              Explore
            </Button>
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="text-4xl my-12 mx-64 min-w-full font-semibold">
          Shop by Categories
        </h1>
        <div className="mx-64 min-w-[800px]">
          <HorizontalCategories />
        </div>
      </div>
      <div className="">
        <h1 className="text-4xl my-12 mx-64 min-w-full font-semibold">
          Our collections
        </h1>
        <div className="mx-64 grid grid-cols-4 space-x-12 min-w-[800px] gap-y-2">
          <button className="w-min-72 bg-zinc-50 p-5 group">
            <img
              className="w-auto h-auto scale-90 group-hover:scale-95 transition-all duration-300"
              src="/images/razer.svg"
            />
          </button>
          <button className="w-min-72 bg-zinc-50 py-5 px-10 group">
            <img
              className="w-auto h-auto group-hover:scale-105 transition-all duration-300"
              src="/images/logitech.svg"
            />
          </button>
          <button className="w-min-72 bg-zinc-50 py-5 px-10 group">
            <img
              className="w-auto h-auto group-hover:scale-105 transition-all duration-300"
              src="/images/corsair.svg"
            />
          </button>
          <button className="w-min-72 bg-zinc-50 py-5 px-10 group">
            <img
              className="w-auto h-auto group-hover:scale-105 transition-all duration-300"
              src="/images/asus.svg"
            />
          </button>
        </div>
        <div className="flex flex-col">
          <Separator className="mt-14 bg-black bg-opacity-50 w-1/2 place-self-center" />
        </div>
      </div>
    </div>
  );
}
