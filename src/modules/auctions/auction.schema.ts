import { z } from "zod";

const AuctionStatus = z.enum(["DRAFT", "ACTIVE", "ENDED"]);

export const CreateAuctionSchema = z.object({
  title: z.string().min(3),
  description: z.string().max(5000).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "ENDED"]).optional(),
  currentPrice: z.number().int().min(0).optional(),
  url: z.string().url().optional(),
  categoryId: z.string().min(1),
});

export const UpdateAuctionSchema = CreateAuctionSchema.partial();

export type CreateAuctionDto = z.infer<typeof CreateAuctionSchema>;
export type UpdateAuctionDto = z.infer<typeof UpdateAuctionSchema>;
