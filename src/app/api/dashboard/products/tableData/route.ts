import Category from "@/lib/models/category.model";
import Product from "@/lib/models/product.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
  connectToDB();
  const products = await Product.find({}).populate("category").exec();

  const tableData = products.map((product) => {
    {
      return {
        name: product.name,
        price: product.price,
        id: product._id,
        stock: product.quantity,
        category: product.category.name,
      };
    }
  });

  return NextResponse.json(tableData);
};
