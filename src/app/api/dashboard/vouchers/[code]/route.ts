import Voucher from "@/lib/models/voucher.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const code = await req.url.split("/").pop();
  const voucher = await Voucher.findOne({ _id: code });
  return NextResponse.json(voucher);
};

export const PATCH = async (req: Request) => {
  const code = await req.url.split("/").pop();
  const {
    minimumOrderValue,
    discount,
    description,
    startDate,
    endDate,
    usageLimit,
    usageCount,
    products,
    appliedAll,
  } = await req.json();

  const voucher = await Voucher.findOne({ _id: code });
  voucher.minimumOrderValue = minimumOrderValue;
  voucher.discount = discount;

  voucher.description = description;
  voucher.startDate = startDate;
  voucher.endDate = endDate;
  voucher.usageLimit = usageLimit;
  voucher.usageCount = usageCount;
  voucher.products = products;
  voucher.appliedAll = appliedAll;
  await voucher.save();
  return NextResponse.json(voucher);
};
