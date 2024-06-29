import Voucher from "@/lib/models/voucher.model";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { code, discount, startDate, endDate, usageLimit, usageCount, products, appliedAll, description, minimumOrderValue } = body;
  const voucher = await Voucher.create({
    code,
    discount,
    startDate,
    endDate,
    usageLimit,
    usageCount,
    products,
    appliedAll,
    description,
    minimumOrderValue,
  });
  return NextResponse.json(voucher);
}