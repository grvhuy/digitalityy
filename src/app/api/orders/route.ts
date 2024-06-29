import Order from "@/lib/models/order.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  connectToDB()
  const orders = await Order.find({})
  return NextResponse.json(orders)
}

export const POST = async (req: Request) => {
  connectToDB()
  const body = await req.json()
  const order = new Order({
    ...body
  })
  await order.save()
  return NextResponse.json(body)
}
