import Voucher from "@/lib/models/voucher.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  connectToDB()
  const vouchers = await Voucher.find({})

  const tableData = vouchers.map((voucher) => {{
    return {
      id: voucher._id,
      code: voucher.code,
      startDate: voucher.startDate,
      endDate: voucher.endDate,
      usageLimit: voucher.usageLimit,
    }
  }})
  return NextResponse.json(tableData)
}


