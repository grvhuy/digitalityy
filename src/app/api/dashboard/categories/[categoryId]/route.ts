import Category from "@/lib/models/category.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  connectToDB();
  const category = await Category.findById(req.url.split("/").pop()).populate("parent").exec();
  return NextResponse.json(category);
};

export const PUT = async (req: Request) => {
    connectToDB();
    const values = await req.json();
    const id = req.url.split("/").pop();
    const { name, parent, images, properties } = values;
    await Category.findByIdAndUpdate(id, {
      name,
      parent: parent ? parent._id : null,
      images,
      properties,
    });
  return NextResponse.json(values);
};
