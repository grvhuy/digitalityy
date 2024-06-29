import Refund from "@/lib/models/refund.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  connectToDB();
  const orderId = await req.url.split("/").pop();
  const refunds = await Refund.find({ order: orderId });
  return NextResponse.json(refunds);
}