"use client"

import ProductForm from "@/components/dashboard/ProductForm"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const DashboardProductDetails = () => {

  const { id } = useParams()
  const [product, setProduct] = useState<any>(null);
  
  useEffect(() => {
    axios.get(`/api/dashboard/products/${id}`).then((res) => {
      setProduct(res.data);
      console.log(res.data);
    });
  }, [])
  

  if (!product) {
    return <div>Loading...</div>
  }
  else return (
    <div className="flex ml-72">
      <ProductForm {...product} />
    </div>
  )
}

export default DashboardProductDetails