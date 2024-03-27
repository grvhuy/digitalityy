import Order from "@/lib/models/order.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  connectToDB()
  const body = await req.json()
  const order = new Order({
    ...body
  })
  await order.save()
  return NextResponse.json(body)
}