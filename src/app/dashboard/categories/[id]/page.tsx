"use client";

import CategoryDetailsForm from "@/components/dashboard/CategoryDetailsForm";
import CategoryForm from "@/components/dashboard/CategoryForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardCategoryDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await axios.get(`/api/dashboard/categories/${id}`);
      setCategory(data);
    }
    fetchCategory();
  }, []);

  useEffect(() => {
    console.log("category: ", category);
  }, [category]);

  return (
    <div className="flex ml-72">
      {/* <h1>something</h1> */}
      {category ? (
        <CategoryDetailsForm 
          {...category}
          parent={category.parent?.name}
        />
      ) : (
        <CategoryForm />
      )}
    </div>
  );
};

export default DashboardCategoryDetails;
