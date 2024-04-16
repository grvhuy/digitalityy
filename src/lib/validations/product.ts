"use client"
import {z} from 'zod'

export const ProductValidation = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters long"}),
  description: z.string(),
  productSpecs: z.array(z.object({})),
  price: z.number(),
  category: z.string(),
  images: z.array(z.string()),
  categoryName: z.string(),
  quantity: z.number(),
  brand: z.string(),
  // tags: z.array(z.string()),
})