import Category from "@/lib/models/category.model"
import connectToDB from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  connectToDB()
  const categories = await Category.find({}).populate('parent')

  const tableData = categories.map((category) => {{
    return {
      id: category._id,
      name: category.name,
      parent: category.parent ? category.parent.name : 'No Parent Category',
    }
  }})
  return NextResponse.json(tableData)
}


