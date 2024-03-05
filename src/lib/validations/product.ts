"use client"
import {z} from 'zod'

export const ProductValidation = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters long"}),
  description: z.string(),
  productSpecs: z.object({}),
  // category: z.string(),
  // tags: z.array(z.string()),
  // photo: z.string()
})