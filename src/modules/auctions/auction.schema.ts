import { z } from "zod";

export const CreateAuctionSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "ENDED"]).optional(),
  currentPrice: z.number().nonnegative().optional(),
  url: z.string().url().optional(),
  categoryId: z.string().min(1),
});

export const UpdateAuctionSchema = CreateAuctionSchema.partial();

export type CreateAuctionDto = z.infer<typeof CreateAuctionSchema>;
export type UpdateAuctionDto = z.infer<typeof UpdateAuctionSchema>;
