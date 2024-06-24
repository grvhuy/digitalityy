"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import HorizontalCategories from "./HorizontalCategories";
import { useState, useEffect } from "react";

export default function LandingPage() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-row">
        <section className="min-w-full h-4/6 min-h-[600px] bg-cover bg-center bg-[url('/images/banner.png')] ">
          {/* <img
            className="ml-36"
            src="/images/banner_transparent.png"
            alt="Banner Picture"
            draggable="false"
          /> */}
          <div className="w-1/3 ml-[12rem] my-36">
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
        </section>
      </div>
      <div className="">
        <h1 className="text-4xl my-12 mx-64 min-w-full font-semibold">
          Shop by Categories
        </h1>
        <div className="mx-64">
          <HorizontalCategories />
        </div>
      </div>
      <div className="">
        <h1 className="text-4xl my-12 mx-64 min-w-full font-semibold">
          Our collections
        </h1>
        <div className="mx-64 grid grid-cols-4 space-x-12">
          <button className="bg-zinc-50 p-5 group">
            <img
              className="w-full h-full scale-90 group-hover:scale-95 transition-all duration-300"
              src="/images/razer.svg"
            />
          </button>
          <button className="bg-zinc-50 py-5 px-10 group">
            <img
              className="w-56 h-auto group-hover:scale-105 transition-all duration-300"
              src="/images/logitech.svg"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
