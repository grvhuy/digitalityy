"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function SettingsMenu() {
  return (
    <div className="bg-gray-100 rounded-3xl mx-60 my-12 p-12 ">
      <div className="flex flex-row gap-x-3 mb-4">
        <Avatar className="place-self-center h-14 w-14">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-semibold ">
          Welcome
          <span className="text-3xl ml-2 animate-waving-hand origin-[70%_70%]">
            👋
          </span>
          <br />
          User A
        </h1>
      </div>
      <Separator />
      <div>
        <ul className="font-medium hover:[&>li]:scale-[.99] [&>li]:p-4 hover:[&>li]:bg-gray-200 [&>li]:transition-all [&>li]:duration-300 [&>li]:rounded-lg [&>li]:cursor-pointer [&>li]:flex [&>li]:flex-row [&>li]:relative">
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
          <li>
            Change your password{" "}
            <MdOutlineKeyboardArrowRight
              size={25}
              className="absolute right-0 text-gray-400"
            />
          </li>
          <Separator />
          <li>
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
