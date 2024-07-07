import Voucher from "@/lib/models/voucher.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const code = await req.url.split("/").pop();
  const voucher = await Voucher.findOne({ code });
  return NextResponse.json(voucher);
};
