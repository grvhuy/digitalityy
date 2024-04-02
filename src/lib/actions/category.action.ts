import Category from "../models/category.model"
import connectToDB from "../mongoose"

export const FindCategoryById = async (id: string) => {
  connectToDB()
  const category = await Category.findById(id)
  return category
}