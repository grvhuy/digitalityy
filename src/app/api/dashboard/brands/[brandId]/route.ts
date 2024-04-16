import Brand from "@/lib/models/brand.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  connectToDB();
  const category = await Brand.findById(req.url.split("/").pop());
  return NextResponse.json(category);
};

export const PUT = async (req: Request) => {
  connectToDB();
  const values = await req.json();
  const { name, description, images } = values;
  const id = req.url.split("/").pop();
  const brand = await Brand.findByIdAndUpdate(id, {
    name,
    description,
    images,
  })
  return NextResponse.json(brand);
};

export const DELETE = async (req: Request) => {
  connectToDB();
  const id = req.url.split("/").pop();
  const brand = await Brand.findByIdAndDelete(id);
  return NextResponse.json(brand);
}
