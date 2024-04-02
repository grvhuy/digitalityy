"use client"

import CategoryDetailsForm from "@/components/dashboard/CategoryDetailsForm";
import CategoryForm from "@/components/dashboard/CategoryForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardCategoryDetails = () => {
  
  const { id } = useParams();
  const [category, setCategory] = useState<any>(null);
  
  useEffect(() => {
    axios.get(`/api/dashboard/categories/${id}`).then((res) => {
      setCategory({
        ...res.data,
      });
    });
    
  }, []);

  useEffect(() => {
    console.log("category: ", category);
  }, [category])

  return (
    <div className="flex ml-72">
      {category && <CategoryDetailsForm {...category} />}
    </div>
  );
};

export default DashboardCategoryDetails;
