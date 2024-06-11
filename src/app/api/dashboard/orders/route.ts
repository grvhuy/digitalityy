import Order from "@/lib/models/order.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  connectToDB()
  const orders = await Order.find({})
  return NextResponse.json(orders)
}