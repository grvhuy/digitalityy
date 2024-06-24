"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsMenu() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const handleAccesibility = () => {
    router.push("/user/settings/accessibility");
  };
  const handleChangePassword = () => {
    router.push("/user/settings/change-password");
  };
  return (
    <div className="bg-zinc-100 rounded-3xl mx-[480px] my-12 p-12 min-w-[700px]">
      <div className="flex flex-row gap-x-3 mb-4">
        <Avatar className="place-self-center h-14 w-14">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-semibold flex flex-row place-self-center">
          Welcome User A
          <br />
          <div className="text-3xl ml-2 animate-waving-hand origin-[70%_70%]">
            👋
          </div>
        </h1>
      </div>
      <Separator />
      <div>
        <ul className="font-medium hover:[&>li]:scale-[.99] [&>li]:p-4 hover:[&>li]:bg-eerie_black hover:[&>li]:text-yellow-400 [&>li]:transition-all [&>li]:duration-200 [&>li]:rounded-lg [&>li]:cursor-pointer [&>li]:flex [&>li]:flex-row [&>li]:relative">
          <li className="flex flex-row relative group ">
            Edit Profile
            <MdOutlineKeyboardArrowRight
              size={25}
              className="absolute right-0 text-gray-400"
            />
          </li>
          <Separator />
          <li>
            Order History
            <MdOutlineKeyboardArrowRight
              size={25}
              className="absolute right-0 text-gray-400"
            />
          </li>
          <Separator />
          <li>
            My Wishlist{" "}
            <MdOutlineKeyboardArrowRight
              size={25}
              className="absolute right-0 text-gray-400"
            />
          </li>
          <Separator />
          <li>
            Manage Addresses{" "}
            <MdOutlineKeyboardArrowRight
              size={25}
              className="absolute right-0 text-gray-400"
            />
          </li>
          <Separator />
          <li onClick={handleChangePassword}>
            Change your password{" "}
            <MdOutlineKeyboardArrowRight
              size={25}
              className="absolute right-0 text-gray-400"
            />
          </li>
          <Separator />
          <li onClick={handleAccesibility}>
            Accessbility{" "}
            <MdOutlineKeyboardArrowRight
              size={25}
              className="absolute right-0 text-gray-400"
            />
          </li>
          <Separator />
        </ul>
      </div>
    </div>
  );
}
