import { AuctionRepository } from "./auction.repository.js";
import { AppError } from "../../shared/AppError.js";
import type { CreateAuctionDto, UpdateAuctionDto } from "./auction.schema.js";
import { prisma } from "../../db/prisma.js";

export class AuctionService {
  constructor(private repo = new AuctionRepository()) { }

  async create(dto: CreateAuctionDto) {
    if (!dto.categoryId) {
      throw new AppError(400, "CATEGORY_ID_REQUIRED", "categoryId is required");
    }

    const category = await prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new AppError(404, "CATEGORY_NOT_FOUND", "Category not found");
    }
    return this.repo.create(dto);
  }

  async list(params: { status?: "DRAFT" | "ACTIVE" | "ENDED"; q?: string }) {
    return this.repo.findMany(params);
  }

  async get(id: string) {
    const auction = await this.repo.findById(id);
    if (!auction) throw new AppError(404, "NOT_FOUND", "Auction not found");
    return auction;
  }

  async update(id: string, dto: UpdateAuctionDto) {
    await this.get(id);
    return this.repo.update(id, dto);
  }

  async remove(id: string) {
    await this.get(id);
    return this.repo.delete(id);
  }
}
