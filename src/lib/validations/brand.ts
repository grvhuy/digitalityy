import { z } from "zod";

export const BrandValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters long" }),
});
