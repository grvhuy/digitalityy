"use client"
import {z} from 'zod'

export const ProductValidation = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters long"}),
  description: z.string().min(7, {message: "Description must be at least 2 characters long"}),
  productSpecs: z.array(z.object({})),
  price: z.number().min(1, {message: "Price must be at least 1"}),
  // category không cần thiết
  category: z.string(),
  images: z.array(z.string()),
  variant: z.array(z.any()),
  categoryName: z.string(),
  quantity: z.number(),
  brand: z.string(),
  discount: z.number().optional(),
  // tags: z.array(z.string()),
})