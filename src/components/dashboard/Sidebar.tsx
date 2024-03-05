"use client"

import { MdDashboard, MdBusiness, MdAssignment } from "react-icons/md";
import SidebarItems from "./SidebarItem";
import {  useState } from "react";

const menuItems = [
  { name: "Users", path: "/dashboard/users", icon: <MdDashboard /> },
  { name: "Products", path: "/dashboard/products", icon: <MdBusiness /> },
  { name: "Orders", path: "/dashboard/orders", icon: <MdAssignment /> },
];

const Sidebar = () => {

  const [active, setActive] = useState(false);

  return (
    <div className="flex h-full w-240 left-0 top-0 fixed mt-4 overflow-x-hidden pt-20  transition-all space-x-8">
      <ul className="list-none">
        {menuItems.map((item, index) => {
          return (
            <li key={index} className="flex items-center pl-4 pr-24 py-2">
              <SidebarItems
                path={item.path}
                icon={item.icon}
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
