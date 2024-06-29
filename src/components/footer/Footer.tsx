import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";
import { Button } from "../ui/button";
import { FaRegSmile } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { FaRegCreditCard } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-row mx-64 my-24 justify-around gap-x-16">
        <div className="flex flex-col gap-y-6">
          <div className=" place-self-center">
            <div className="rounded-full bg-eerie_black p-3">
              <FaRegSmile className="text-yellow-400" size={40} />
            </div>
          </div>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
            harum ratione cupiditate reprehenderit voluptatum eaque maxime nihil
            inventore sapiente porro expedita culpa quae maiores, non veritatis,
            ex quisquam voluptates vero.
          </span>
        </div>
        <div className="flex flex-col gap-y-6">
          <div className=" place-self-center">
            <div className="rounded-full bg-eerie_black p-3">
              <FiTruck className="text-yellow-400" size={40} />
            </div>
          </div>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit similique quae dolorum quod eveniet, aliquam eum nobis
            ad, ab veritatis maiores magni? Animi neque aperiam dolores iste
            alias fuga dicta.
          </span>
        </div>
        <div className="flex flex-col gap-y-6">
          <div className=" place-self-center">
            <div className="rounded-full bg-eerie_black p-3">
              <FaRegCreditCard className="text-yellow-400" size={40} />
            </div>
          </div>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
            mollitia error, provident iure quidem aspernatur illo in odit maxime
            ducimus eius! Soluta illo fugit error architecto ex laborum nulla
            dolores?
          </span>
        </div>
      </div>
      <div className="px-56 py-16 text-white font-quicksand bg-eerie_black p-12 text-sm">
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
                Enter your email below to receive notifications of special
                offers and deals
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
          <div className="place-self-center">©2024 Digitalityy</div>
        </div>
      </div>
    </footer>
  );
}
