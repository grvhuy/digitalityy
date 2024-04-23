import Transaction from "@/lib/models/transaction.model";
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  connectToDB()
  const transactions = await Transaction.find();
  return NextResponse.json(transactions)
}