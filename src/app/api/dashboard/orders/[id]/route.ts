import Order from "@/lib/models/order.model"
import connectToDB from "@/lib/mongoose"
import { Mongoose } from "mongoose"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  const id = req.url.split("/").pop()
  connectToDB()

  const order = await Order.findById(id)

  return NextResponse.json(order)
}