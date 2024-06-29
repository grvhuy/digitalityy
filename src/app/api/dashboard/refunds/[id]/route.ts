import Order from "@/lib/models/order.model";
import Refund from "@/lib/models/refund.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {

  const id = req.url.split("/").pop();
  const refunds = await Refund.findById(id).populate("order");
  return NextResponse.json(refunds);
}