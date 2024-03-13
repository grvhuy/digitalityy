import Product from "@/lib/models/product.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  connectToDB()
  const products = await Product.find({})

  const tableData = products.map((product) => {{
    return {
      name: product.name,
      category: product.categoryName,
      price: product.price,
      id: product._id,
    }
  }})
  return NextResponse.json(tableData)
}


