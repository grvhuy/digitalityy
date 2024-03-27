import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  const userName = req.url.split("/").pop()
  
}

