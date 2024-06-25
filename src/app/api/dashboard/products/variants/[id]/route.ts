import Product from "@/lib/models/product.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id = req.url.split("/").pop();
  const product = await Product.findById(id);
  const variants = product?.variant || [];
  return NextResponse.json(variants);
};

export const POST = async (req: Request) => {
  const id = req.url.split("/").pop();
  const values = await req.json();
  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json("Product not found");
  }
  if (!product.variant) {
    product.variant = [];
    product.variant.push(values);

  } else {
    product.variant.push(values);
  }

  await product.save();
  return NextResponse.json(product.variant);
};

export const PUT = async (req: Request) => {
  const id = req.url.split("/").pop();
  const values = await req.json();
  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json("Product not found");
  }
  const variant = product.variant.id(values._id);
  variant.set(values);
  await product.save();
  return NextResponse.json(product);
};

export const DELETE = async (req: Request) => {
  const id = req.url.split("/").pop();
  const values = await req.json();
  const index = values.index;

  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json("Product not found");
  }
  product.variant.splice(index, 1);
  await product.save();
  return NextResponse.json(product.variant);
};
