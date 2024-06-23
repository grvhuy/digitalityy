import Address from "@/lib/models/address.model"
import Order from "@/lib/models/order.model"
import User from "@/lib/models/user.model"
import connectToDB from "@/lib/mongoose"
import { Mongoose } from "mongoose"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  const id = req.url.split("/").pop()
  connectToDB()

  const order = await Order.findById(id)

  const address = await Address.findById(order.address)

  const user = await User.findById(order.userId)

  return NextResponse.json({
    order,
    address,
    user
  })
}

export const PATCH = async (req: Request) => {
  connectToDB()
  const id = req.url.split("/").pop()
  const { location, status } = await req.json()
  const newShippingInfo = {
    location,
    status,
    updatedAt: new Date(),
  }    //mot phan tu moi trong mang shippingInfo

  const order = await Order.updateOne(
    { _id: id },
    { $push: { shippingInfo: newShippingInfo } }
  )
  
  return NextResponse.json({
    order
  })
}

export const DELETE = async (req: Request) => {
  const id = req.url.split("/").pop()
  connectToDB()

  const order = await Order.findByIdAndDelete(id)

  return NextResponse.json({
    order
  })
}
