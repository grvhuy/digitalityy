import Product from "@/lib/models/product.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const categoryId = req.url.split("/").pop();
  await connectToDB();
  // Chi lay nhieu nhat 5 san pham
  const products = await Product.find({ category: categoryId }).limit(5);
  return NextResponse.json(products);

}