import User from "@/lib/models/user.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  connectToDB()
  const values = await req.json()
  const { email } = values
  const user = await User.findOne({ email }).select("_id")
  console.log("user: ", user)
  return NextResponse.json({ user })
}