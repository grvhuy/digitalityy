"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import axios from "axios";
import { ArrowRightCircle, XCircleIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const ProductSheet = () => {
  const [categories, setCategories] = useState<any[]>([]);

  const [toolTipIndex, setToolTipIndex] = useState<number>();

  const toggleSheet = (index: number) => {
    setToolTipIndex(index);
  }

  useEffect(() => {
    axios.get("api/dashboard/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <div>
      <Sheet>
        <SheetTrigger className="flex flex-row mx-6 py-2 px-5 hover:bg-eerie_black hover:text-white rounded-2xl transition-all duration-500">
          Products
          <MdOutlineKeyboardArrowDown className="place-self-center" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="mb-8"></SheetHeader>
          {categories.map((item, index) => {
            return (
              <div className="my-2.5" key={index}>
                <button
                  onClick={() => toggleSheet(index)}
                  className="w-full flex items-center justify-between space-y-4 hover:font-bold text-2xl"
                >
                  {item.name}
                  <ArrowRightCircle className="text-sm text-muted-foreground hover:text-primary" />
                </button>
                
                  <div >
                    <div 
                      className={`
                      bg-white w-full h-full absolute inset-x-0 top-0 mt-0 
                      px-10 py-4 ml-[384px] z-50
                      ${
                        toolTipIndex === index ? "transition-all duration-300 top-0" : "top-0 -translate-y-full transition-all duration-300"
                      }
                      `
                      }>
                      <button 
                        className="flex items-center right-0 top-0 absolute px-2 py-2"
                        onClick={() => {
                        setToolTipIndex(-1);
                      }}>
                        <XIcon width={20} height={20} className="text-muted-foreground hover:text-primary" />
                      </button>

                      <div className="flex flex-col space-y-4 text-lg mt-8">
                        <a href="#" className="text-primary">Children Category</a>
                        <a href="#" className="text-primary">Children Category</a>
                        <a href="#" className="text-primary">Children Category</a>
                        <a href="#" className="text-primary">Children Category</a>

                      </div>
                    </div>
                  </div>
              </div>
            );
          })}
        </SheetContent>
      </Sheet>
    </div>
  );
};
