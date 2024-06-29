import Refund from "@/lib/models/refund.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  connectToDB()
  const refunds = await Refund.find({})

  const tableData = refunds.map((refund) => {{
    return {
      id: refund._id,
      date: refund.createdAt,
    }
  }})
  return NextResponse.json(tableData)
}


