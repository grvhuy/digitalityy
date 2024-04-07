import Address from "@/lib/models/address.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const userId = req.url.split("/").pop()
  connectToDB()
  const addresses = await Address.find({ userCreated: userId })
    .populate("userCreated")
  return NextResponse.json(addresses);
}