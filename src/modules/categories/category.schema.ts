import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(2).max(100),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
