import Category from "@/lib/models/category.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  connectToDB();
  const category = await Category.findById(req.url.split("/").pop()).populate(
    "parent"
  );
  return NextResponse.json(category);
};

export const PUT = async (req: Request) => {
  try {
    connectToDB();
    const values = await req.json();
    const id = req.url.split("/").pop();
    const { name, description, parent } = values;
    await Category.findByIdAndUpdate(id, {
      name,
      description,
      parent: parent || null,
    });
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json("update category success!");
};
