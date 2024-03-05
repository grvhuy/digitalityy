"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItems = ({name, path, icon} : {name: string, path: string, icon:any}) => {

  const pathName = usePathname();

  return <div className="pl-4 pr-4">
    <Link className={cn("flex items-center px-2", {
      "bg-blue-500": pathName === path,
    } )} href={path}>
      {icon}
      <p className="ml-4">{name}</p>
    </Link>
  </div>
}

export default SidebarItems;
