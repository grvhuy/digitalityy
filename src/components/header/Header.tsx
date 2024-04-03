"use client";

import { GiHamburgerMenu } from "react-icons/gi";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiFillShopping } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";

import { useRouter } from "next/navigation";
import { ProductSheet } from "../ProductSheet";
import axios from "axios";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  useEffect(() => {
    axios.get("/api/dashboard/categories").then((result) => {
      setCategories(result.data);
      console.log(result.data);
    });
  }, []);
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

  const homeClick = () => {
    router.push("/");
  };


  useEffect(() => {

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  //top-0 p-10 text-eerie_black font-quicksand bg-white sticky -translate-y-full
  return (
    <>
          <header
      className={`p-6 text-eerie_black font-quicksand drop-shadow bg-white sticky ${
        visible
          ? "transition-all duration-300 top-0 "
          : "top-0 -translate-y-full transition-all duration-300"
      }`}
    >
      <div className="flex flex-row gap-x-5 justify-between items-center">
        <div className="flex flex-row cursor-pointer" onClick={homeClick}>
          <svg
            className="w-10 h-10 ml-5"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 290.22 290.22"
          >
            <path
              d="M210,152.39H71.34a6.45,6.45,0,0,0-6.45,6.45v83.84h0a6.45,6.45,0,0,0,6.45,6.45H210a48.37,48.37,0,0,1,0,96.74H135.83a6.45,6.45,0,0,0-6.45,6.45v19.35a6.45,6.45,0,0,0,6.45,6.45H210a80.62,80.62,0,0,0,0-161.24H102a4.83,4.83,0,0,1-4.83-4.83V189.47a4.83,4.83,0,0,1,4.83-4.83H210a112.86,112.86,0,0,1,0,225.72H102a4.83,4.83,0,0,1-4.83-4.83V318.46a4.84,4.84,0,0,1,4.83-4.84h117.7a6.44,6.44,0,0,0,6.45-6.45V287.83a6.44,6.44,0,0,0-6.45-6.45H69.73a4.83,4.83,0,0,0-4.84,4.83v150a6.45,6.45,0,0,0,6.45,6.45H210a145.11,145.11,0,0,0,0-290.22Z"
              transform="translate(-64.89 -152.39)"
            />
          </svg>
          <h1 className="relative text-3xl font-mono font-bold top-2">
            igitality
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
    </>
  );
}
