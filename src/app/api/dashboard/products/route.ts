import Product from "@/lib/models/product.model"
import Category from "@/lib/models/category.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  connectToDB()
  const products = await Product.find({}).populate({
    path: 'category',
    model: Category,
  })
  return NextResponse.json(products)
}


export const POST = async (req: Request) => {
  connectToDB()
  const values = await req.json()
  
  const createdProduct = await Product.create({
    name: values.name,
    description: values.description,
    productSpecs: values.productSpecs,
    category: values.category || null,
  });

  return NextResponse.json(createdProduct)
}
