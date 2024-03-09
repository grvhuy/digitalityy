import { z } from "zod";

export const CategoryValidation = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters long"}),
  parent: z.string(),
  properties: z.array(z.string())
  // photo: z.string()
})