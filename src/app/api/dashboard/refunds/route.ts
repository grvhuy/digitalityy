import Order from "@/lib/models/order.model";
import Refund from "@/lib/models/refund.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const refunds = await Refund.find();
  return NextResponse.json(refunds);
}

export const POST = async (req: Request) => {
  try {
    const { orderId, reason } = await req.json();
    // const order = await Order.findById(orderId);
    const refund = new Refund({
      order: orderId,
      reason,
      status: "pending",
      refundInfo: {},
    });
    await refund.save();
    return NextResponse.json(refund);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}