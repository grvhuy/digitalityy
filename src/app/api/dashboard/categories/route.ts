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
  const { name, parent, properties, images } = values;
  const createdCategory = await Category.create({ 
    name, 
    properties, 
    parent: parent || null, 
    images,
  });
  return NextResponse.json(createdCategory);
};

export const PUT = async (req: Request) => {
  connectToDB();
  const values = await req.json();
  const { id, name, properties, parent } = values;
  const updatedCategory = await Category.findByIdAndUpdate({
    _id: id,
  }, {
    name,
    properties,
    parent: parent || null,
  }, {
    new: true,
  })
  return NextResponse.json(updatedCategory);
}

export const DELETE = async (req: Request) => {
  const id = req.url.split("/").pop();
  try {
    connectToDB()
    const product = await Category.findByIdAndDelete(id);
    console.log("product deleted", product);
    return NextResponse.json("delete product success!");
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.error();
  }
}