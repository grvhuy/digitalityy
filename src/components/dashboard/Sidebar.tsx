"use client"

import { MdDashboard, MdBusiness, MdAssignment } from "react-icons/md";
import SidebarItems from "./SidebarItem";
import {  useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

const menuItems = [
  // { name: "Users", path: "/dashboard/users", icon: <MdDashboard /> },
  { name: "Products", path: "/dashboard/products", icon: <MdBusiness /> },
  { name: "Categories", path: "/dashboard/categories", icon: <MdAssignment /> },
  { name: "Orders", path: "/dashboard/orders", icon: <MdAssignment /> },
  { name: "Brands", path: "/dashboard/brands", icon: <MdAssignment /> },
  { name: "Providers", path: "/dashboard/provider", icon: <MdAssignment /> },
  // { name: "Inventory", path: "/dashboard/orders", icon: <MdAssignment /> },
];

const Sidebar = () => {

  const [active, setActive] = useState(false);

  return (
    <div className="flex h-full bg-blue-200 w-60 left-0 top-0 fixed mt-20 overflow-x-hidden pt-4  transition-all ">
      <ul className="list-none">
        {menuItems.map((item, index) => {
          return (
            <li key={index} className="flex items-center pl-4 pr-24 py-2">
              {/* {active ? <ArrowRight size={24} /> : <ChevronRight size={24} />} */}
              <SidebarItems
                path={item.path}
                name={item.name}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
