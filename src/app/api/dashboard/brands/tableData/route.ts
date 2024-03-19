import Brand from "@/lib/models/brand.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  connectToDB()
  const brands = await Brand.find({})

  const tableData = brands.map((brand) => {{
    return {
      id: brand._id,
      name: brand.name,
      description: brand.parent ? brand.parent.name : 'No Parent Category',
    }
  }})
  return NextResponse.json(tableData)
}


