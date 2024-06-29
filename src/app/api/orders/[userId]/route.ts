import Order from "@/lib/models/order.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const userId = req.url.split("/").pop()

  const orders = await Order.find({ userId })

  return NextResponse.json({ orders })
}