"use client";

import { AiFillShopping } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect } from "react";

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });
  //top-0 p-10 text-eerie_black font-quicksand bg-white sticky -translate-y-full
  return (
    <header
      className={`p-10 text-eerie_black font-quicksand drop-shadow bg-white sticky ${
        visible
          ? "transition-all duration-300 top-0 "
          : "top-0 -translate-y-full transition-all duration-300"
      }`}
    >
      <div className="flex flex-row gap-x-5 justify-between">
        <div className="flex flex-row">
          <AiFillShopping size={45} />
          <h1 className="relative text-3xl font-mono font-bold left-2 top-2">
            Digitality
          </h1>
        </div>
        <nav className="place-self-center ">
          <ul className="flex  list-none text-center font-bold">
            <button className="mx-6 py-2 px-5 hover:bg-eerie_black hover:text-white rounded-2xl transition-all duration-500">
              Home
            </button>
            <button className="flex flex-row mx-6 py-2 px-5 hover:bg-eerie_black hover:text-white rounded-2xl transition-all duration-500">
              Products
              <MdOutlineKeyboardArrowDown className="place-self-center" />
            </button>
            <button className="mx-6 py-2 px-5 hover:bg-eerie_black hover:text-white rounded-2xl transition-all duration-500">
              News
            </button>
            <button className="mx-6 py-2 px-5 hover:bg-eerie_black hover:text-white rounded-2xl transition-all duration-500">
              Contact Us
            </button>
          </ul>
        </nav>
        <div className="flex flex-row gap-5 place-self-center mr-5">
          <button>
            <IoSearch />
          </button>
          <button>
            <LuUser2 />
          </button>
          <button>
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </header>
  );
}
