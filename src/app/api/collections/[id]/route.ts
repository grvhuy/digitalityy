import Category from "@/lib/models/category.model";
import Product from "@/lib/models/product.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id = req.url.split("/").pop();
  connectToDB();
  const category = await Category.findById(id).populate("parent");
  const products = await Product.find({
    category: id,
  })
  return NextResponse.json({ category, products });
}