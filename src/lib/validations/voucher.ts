import { z } from "zod";

export const VoucherValidation = z.object({
  minimumOrderValue: z.number().min(0, "Minimum order value must be greater than or equal to 0"),
  discount: z.number().min(0, "Discount must be greater than or equal to 0"),
  code: z.string().nonempty("Code is required"),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  usageLimit: z.number().min(0, "Usage limit must be greater than or equal to 0"),
  usageCount: z.number().min(0, "Usage count must be greater than or equal to 0"),
  products: z.array(z.string()).optional(),
  appliedAll: z.boolean(),
  createdAt: z.date().default(() => new Date()),
});
