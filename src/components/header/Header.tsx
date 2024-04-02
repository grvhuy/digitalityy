"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiFillShopping } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";

import { useRouter } from "next/navigation";
import { ProductSheet } from "../ProductSheet";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isProductHover, setIsProductHover] = useState(false);
  const [isAnyOpen, setIsAnyOpen] = useState(false);

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
      className={`p-4 text-eerie_black font-quicksand drop-shadow bg-white sticky ${
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
            <ProductSheet />
            <button className="mx-6 py-2 px-5 hover:bg-eerie_black hover:text-white rounded-2xl transition-all duration-500">
              Contact Us
            </button>
          </ul>
        </nav>
        <div className="flex flex-row gap-4 place-self-center mr-5">
          <button>
            <IoSearch />
          </button>
          {user ? (
            <div className="flex items-center">
              <h1 className="font-bold ">Hello {user?.name} !</h1>
              <button
                onClick={async () => {
                  await signOut();
                }}
                className="mx-6 py-2 px-5 hover:bg-eerie_black hover:text-white rounded-2xl transition-all duration-500"
              >
                Logout
              </button>
              <button>
                <LuUser2 />
              </button>
            </div>
          ) : (
            <div className="">
              <button onClick={() => router.push('/sign-in')} className=" py-2 px-5 mx-2 hover:bg-eerie_black hover:text-white rounded-2xl transition-all duration-500">
                Sign In
              </button>
              <button onClick={() => router.push('/sign-up')} className=" py-2 px-5 hover:bg-eerie_black hover:text-white rounded-2xl transition-all duration-500">
                Sign Up
              </button>
            </div>
          )}
          <button onClick={() => router.push('/cart')} className="">
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </header>
  );
}
