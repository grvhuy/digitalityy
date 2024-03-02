import { NextResponse } from "next/server";

export const GET = async () => {
  try {

    return NextResponse.json({message: "Hello, World!"});
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};