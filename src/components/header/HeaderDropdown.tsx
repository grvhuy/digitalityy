"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderDropdownItem from "./HeaderDropdownItem";

export default function HeaderDropdown() {
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    axios.get("/api/dashboard/categories").then((result) => {
      setCategories(result.data);
      console.log(result.data);
    });
  }, []);
  return (
    <div className="bg-white w-screen absolute grid gap-4 p-16 shadow-gray-400 shadow-sm rounded-sm top-full -z-1">
      {categories.map((item) => {
        return <HeaderDropdownItem key={item._id} name={item.name} />;
      })}
    </div>
  );
}
