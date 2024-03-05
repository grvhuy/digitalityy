import Category from "@/lib/models/category.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
  connectToDB();
  const categories = await Category.find({}).populate("parent");
  return NextResponse.json(categories);

}

export const POST = async (req: Request) => {
  connectToDB();
  const values = await req.json();
  const { name, description, parent } = values;
  const createdCategory = await Category.create({ 
    name, 
    description, 
    parent: parent || null, 
  });
  return NextResponse.json(createdCategory);
};

export const PUT = async (req: Request) => {
  connectToDB();
  const values = await req.json();
  const { id, name, description, parent } = values;
  const updatedCategory = await Category.findByIdAndUpdate()
}
