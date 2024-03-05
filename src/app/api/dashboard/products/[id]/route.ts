import Category from "@/lib/models/category.model";
import Product from "@/lib/models/product.model";
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
  const { name, description, productSpecs, category } = values;
  await Product.findByIdAndUpdate(id, {
    name,
    description,
    productSpecs,
    category,
  })
  return NextResponse.json("update product success!");
}