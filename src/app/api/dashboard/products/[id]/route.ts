import Category from "@/lib/models/category.model";
import Product from "@/lib/models/product.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id = req.url.split("/").pop();
  const product = await Product.findById(id)
    .populate({
      path: 'category',
      model: Category,
    })
  return NextResponse.json(product);
}

export const PUT = async (req: Request) => {
  const id = req.url.split("/").pop();
  const values = await req.json();
  const { name, description, productSpecs, category, brand, price, quantity, images } = values;
  await Product.findByIdAndUpdate(id, {
    name,
    description,
    productSpecs,
    category,
    price,
    brand,
    quantity,
    images,
  })
  return NextResponse.json("update product success!");
}

export const DELETE = async (req: Request) => {
  const id = req.url.split("/").pop();
  try {
    connectToDB()
    const product = await Product.findByIdAndDelete(id);
    console.log("product deleted", product);
    return NextResponse.json("delete product success!");
  } catch (error) {
    console.error("Error deleting product:", error);
    // Handle error response
    return NextResponse.error();
  }
}