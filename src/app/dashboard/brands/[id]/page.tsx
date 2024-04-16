"use client"

import BrandForm from "@/components/dashboard/BrandForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardBrandsDetails = () => {
  
  const { id } = useParams();
  const [brand, setBrand] = useState<any>(null);
  
  useEffect(() => {
    axios.get(`/api/dashboard/brands/${id}`).then((res) => {
      setBrand({
        ...res.data,
      });
    });
    
  }, []);

  useEffect(() => {
    console.log("brands: ", brand);
  }, [brand])

  return (
    <div className="flex ml-72">
      {brand && <BrandForm {...brand} />}
    </div>
  );
};

export default DashboardBrandsDetails;
