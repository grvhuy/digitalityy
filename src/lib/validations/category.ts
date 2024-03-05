import { z } from "zod";

export const CategoryValidation = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters long"}),
  description: z.string(),
  parent: z.string(),
  // photo: z.string()
})