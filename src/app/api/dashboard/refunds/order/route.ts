import Refund from "@/lib/models/refund.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  connectToDB();
  const values = await req.json();
  // const orderId = values.orderId;
  // const refunds = await Refund.find({ order: orderId });
  return NextResponse.json({ message: "Hello" });
}