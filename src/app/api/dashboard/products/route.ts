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
  
  const specifications = values.productSpecs.map((spec: any) => ({
    attributeName: spec.attributeName,
    attributeValue: spec.attributeValue,
  }))

  const createdProduct = await Product
    .create({
      name: values.name,
      price: values.price,
      description: values.description || "",
      category: values.category || null,
      brand: values.brand,
      quantity: values.quantity || null,
      images: values.images || [],
      productSpecs: specifications,
    })

  return NextResponse.json(createdProduct)
}
