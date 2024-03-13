import Inventory from "@/lib/models/inventory.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  connectToDB()
  const inventories = await Inventory.find({})
  return NextResponse.json(inventories)
}

export const POST = async (req: Request) => {
  connectToDB()
  const values = await req.json()
  const { quantity } = values
  const inventory = new Inventory({ quantity, modifiedAt: Date.now() })
  await inventory.save()
  return NextResponse.json(inventory)
}