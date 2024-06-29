"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";

export default function AuthImagesSlider() {
  const images = [
    "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1572666341285-c8cb9790ca50?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1547658718-1cdaa0852790?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <ImagesSlider className="h-[100vh] w-full " images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 2,
        }}
        className="z-50 flex flex-row justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Digitality
        </motion.p>
        <svg
          className="w-14 h-14 ml-5"
          fill="url(#grad3)"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 290.22 290.22"
        >
          <path
            d="M210,152.39H71.34a6.45,6.45,0,0,0-6.45,6.45v83.84h0a6.45,6.45,0,0,0,6.45,6.45H210a48.37,48.37,0,0,1,0,96.74H135.83a6.45,6.45,0,0,0-6.45,6.45v19.35a6.45,6.45,0,0,0,6.45,6.45H210a80.62,80.62,0,0,0,0-161.24H102a4.83,4.83,0,0,1-4.83-4.83V189.47a4.83,4.83,0,0,1,4.83-4.83H210a112.86,112.86,0,0,1,0,225.72H102a4.83,4.83,0,0,1-4.83-4.83V318.46a4.84,4.84,0,0,1,4.83-4.84h117.7a6.44,6.44,0,0,0,6.45-6.45V287.83a6.44,6.44,0,0,0-6.45-6.45H69.73a4.83,4.83,0,0,0-4.84,4.83v150a6.45,6.45,0,0,0,6.45,6.45H210a145.11,145.11,0,0,0,0-290.22Z"
            transform="translate(-64.89 -152.39)"
          />
          <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="50%">
              <stop offset="0%" stop-color="#fafafa" />
              <stop offset="100%" stop-color="#a3a3a3" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </ImagesSlider>
  );
}
