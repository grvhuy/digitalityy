import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { Button } from "../ui/button";

interface CategoriesCardProps {
  name: string;
  images: string[];
  // _id: string;
  onClick?: React.MouseEventHandler;
}

export default function HorizontalCategoryCard(props: CategoriesCardProps) {
  const router = useRouter();
  const [canClick, setCanClick] = useState(false);

  return (
    <div
      className="h-[16rem] w-[16rem] group flex flex-col group"
      onClick={props.onClick}
    >
      <div className="h-[16rem] w-[16rem] flex flex-col relative items-center justify-center rounded-lg dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
        <img
          className="w-[8rem] h-[8rem] place-self-center bg-contain hover:scale-110 transition-all duration-300 select-none"
          draggable="false"
          src={props.images[0]}
          alt={`${props.name} image`}
        ></img>
        <Button className="bg-eerie_black fixed w-12 h-12 rounded-full right-1/3 top-1/2 opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:my-2 duration-500 hover:bg-eerie_black">
          <IoIosArrowForward size={20} />
        </Button>
        <div className="flex flex-col absolute bottom-2 gap-y-1 group-hover:underline ">
          <h1 className="font-semibold text-wrap text-xl select-none">
            {props.name}
          </h1>
        </div>
      </div>
    </div>
  );
}
