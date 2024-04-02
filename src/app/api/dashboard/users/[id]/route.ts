import User from "@/lib/models/user.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  connectToDB()
  const email = req.url.split("/").pop()
  const user = await User.findOne({
    email: email
  })
  return NextResponse.json(user)
}


