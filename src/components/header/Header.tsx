"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";

import { useRouter } from "next/navigation";
import { ProductSheet } from "../products/ProductSheet";
import axios from "axios";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  useEffect(() => {
    axios.get("/api/dashboard/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setSearch("");
  //   router.push(`/search/${search}`);
  // }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      router.push(`/search/${search}`);
      // const formattedSearch = search.replace(/\s+/g, "-");
      // const encodedSearch = encodeURIComponent(search);
      // console.log(encodedSearch);
      // Gửi yêu cầu tìm kiếm đến API sử dụng Axios
      // const response = await axios.get(`/api/search?keyword=${encodedSearch}`);

      // console.log(response.data);
      // search result chỉ lấy mảng id của sản phẩm
      // setSearchResults(
      //   response.data.map((product: any) => product._id)
      // );
      // console.log(searchResults);
      // const query = new URLSearchParams({ results: JSON.stringify(response.data) }).toString();
    } catch (error) {
      console.error("Error:", error);
      // Xử lý lỗi nếu có
    }
  };

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

  const catalogClick = () => {
    router.push("/categories");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  //top-0 p-10 text-eerie_black font-quicksand bg-white sticky -translate-y-full
  return (
    <>
      <header
        className={`p-6 text-eerie_black font-quicksand bg-gradient-to-b from-yellow-200 via-yellow-200 to-yellow-500  sticky top-0 z-50 ${
          visible
            ? "transition-all duration-300 top-0 "
            : "top-0 -translate-y-full transition-all duration-300"
        }`}
      >
        <div className="flex flex-row justify-between items-center">
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
            <h1 className="relative text-3xl font-mono font-semibold top-2">
              igitality
            </h1>
          </div>
          <nav className="">
            <ul className="flex list-none ml-72 pr-12 text-center font-semibold gap-x-6">
              <Button
                variant={"gold_black"}
                className="bg-eerie_black text-white hover:bg-white hover:text-eerie_black font-semibold text-base"
                onClick={catalogClick}
              >
                Catalog
              </Button>
              <Button
                variant={"gold_black"}
                className="bg-eerie_black text-white hover:bg-white hover:text-eerie_black font-semibold text-base"
              >
                Contact Us
              </Button>
              {user?.name === "Admin" && (
                <Button
                  variant={"gold_black"}
                  className="bg-eerie_black text-white hover:bg-white hover:text-eerie_black  font-semibold text-base"
                  onClick={() => router.push("/dashboard/products")}
                >
                  Dashboard
                </Button>
              )}
            </ul>
          </nav>

          <div className="flex flex-row gap-4 items-center">
            <form onSubmit={handleSubmit} className="flex">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              ></Input>
              <Button
                variant="ghost"
                className="rounded-full hover:bg-gray-100 ml-2"
              >
                <IoSearch />
              </Button>
            </form>
            <Button
              variant="ghost"
              onClick={() => router.push("/cart")}
              className="rounded-full hover:bg-gray-100"
            >
              <FiShoppingCart />
            </Button>
            {user ? (
              <div className="flex items-center font-semibold">
                {/* <h1 className="font-bold ">Hello {user?.name} !</h1> */}
                <Button
                  variant={"gold_black"}
                  onClick={async () => {
                    await signOut();
                  }}
                  className="font_semibold mx-6 py-2 px-5 hover:underline bg-eerie_black text-white hover:bg-white hover:text-eerie_black  font-semibold text-base"
                >
                  Logout
                </Button>
                <Link
                  className="rounded-full p-3 hover:bg-white "
                  href="/user/settings"
                >
                  <LuUser2 />
                </Link>
              </div>
            ) : (
              <div className="">
                <Button
                  variant={"gold_black"}
                  onClick={() => router.push("/sign-in")}
                  className="hover:underline bg-eerie_black text-white hover:bg-white hover:text-eerie_black font-semibold rounded-2xl transition-all duration-500 "
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
