import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="px-56 py-16 mt-36 text-white font-quicksand bg-eerie_black p-12 text-sm">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <ul className="flex flex-col gap-2">
            <li className="font-extrabold my-1">Digitality</li>
            <li>{"(+84) 0386 246 184"}</li>
            <li>vhnm3004@outlook.com</li>
            <li>ABCD Street</li>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            <li className="font-bold my-1">Contact Information</li>
            <li>My Account</li>
            <li>Login</li>
            <li>My Cart</li>
            <li>My Wishlist</li>
            <li>Checkout</li>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            <li className="font-bold my-1">About us</li>
            <li>Careers</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            <li className="font-bold my-1">Subscribe</li>
            <li>
              Enter your email below to receive notifications of special offers
              and deals
            </li>
            <div className="relative top-1">
              <Input
                className="text-black"
                placeholder="Enter your email"
              ></Input>
              <button type="submit" className="rounded-3xl bg-white h-full">
                <MdOutlineKeyboardArrowRight className="text-eerie_black  bg-yellow-400 rounded-3xl absolute right-3 top-3 hover:text-yellow-400 hover:bg-eerie_black transition-all duration-500" />
              </button>
            </div>
          </ul>
        </div>
      </div>
      <Separator className="my-14" />
      <div className="flex ">
        <Button className="w-fit rounded-full bg-transparent hover:bg-transparent hover:text-yellow-400">
          <IoLogoFacebook size={30} />
        </Button>
        <Button className="w-fit rounded-full bg-transparent hover:bg-transparent hover:text-yellow-400">
          <IoLogoGoogle size={30} />
        </Button>
        <div className="place-self-center">
          ©2024 Digitalityy
        </div>
      </div>
    </footer>
  );
}
