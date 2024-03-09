import Brand from "@/lib/models/brand.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  connectToDB()
  const brands = await Brand.find({})
  NextResponse.json(brands)
}

export const POST = async (req: Request) => {
    connectToDB()
    const values = await req.json()
    const { name, description } = values
    const brand = new Brand({ name, description })
    await brand.save()
    return NextResponse.json("Brand created successfully!")
}