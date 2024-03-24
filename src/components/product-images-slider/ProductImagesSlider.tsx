"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface ImagesSliderProps {
  imgSrc: string;
}

export default function ProductImagesSlider({ props = [{ imgSrc: "" }] }) {
  const [mainImage, setMainImage] = useState<any>(props[0]);
  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="grid auto-rows-auto ">
        {props.map((image, index) => {
          return (
            <Image
              key={index}
              alt={"Picture of " + index}
              src={image}
              height={200}
              width={200}
              onClick={() => setMainImage(image)}
              className="cursor-pointer ease-in-out duration-300"
            ></Image>
          );
        })}
      </div>
      <Image
        className="object-cover col-span-4 ease-in-out duration-300"
        alt={"Picture from " + mainImage}
        height={500}
        width={500}
        src={mainImage}
      />
    </div>
  );
}
