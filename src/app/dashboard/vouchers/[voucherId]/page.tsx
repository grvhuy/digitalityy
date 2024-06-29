"use client"

import ProductForm from "@/components/dashboard/ProductForm"
import VoucherForm from "@/components/dashboard/VoucherForm"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const DashboardVoucherDetails = () => {

  // const { id } = useParams()
  // const [product, setProduct] = useState<any>(null);
  
  // useEffect(() => {
  //   axios.get(`/api/dashboard/products/${id}`).then((res) => {
  //     setProduct(res.data);
  //     console.log(res.data);
  //   });
  // }, [])
  

  return (
    <div className="flex ml-72">
      <VoucherForm />
    </div>
  )
}

export default DashboardVoucherDetails