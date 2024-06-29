import Address from "@/lib/models/address.model";
import User from "@/lib/models/user.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const userId = req.url.split("/").pop()
  connectToDB()
  const addresses = await Address.find({ userCreated: userId })
    .populate("userCreated")
  return NextResponse.json(addresses);
}

export const PATCH = async (req: Request) => {
  // Set dia chi mac dinh cho nguoi dung
  const values = await req.json();
  const userId = req.url.split("/").pop()
  const { addressId } = values;
  connectToDB()
  await User.findOne({ _id: userId })
    .then((user) => {
      user.defaultAddress = addressId;
      user.save();
    })
  return NextResponse.json({ message: "Set default address successfully" });
}