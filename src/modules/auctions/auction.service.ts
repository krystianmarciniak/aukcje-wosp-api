import { AuctionRepository } from "./auction.repository.js";
import { AppError } from "../../shared/AppError.js";
import type { CreateAuctionDto, UpdateAuctionDto } from "./auction.schema.js";
import { CategoryRepository } from "../categories/category.repository.js";

export class AuctionService {
  constructor(
    private repo = new AuctionRepository(),
    private categoryRepo = new CategoryRepository()
  ) { }

  async create(dto: CreateAuctionDto) {
    const category = await this.categoryRepo.findById(dto.categoryId);
    if (!category) throw new AppError("CATEGORY_NOT_FOUND", "Category not found", 404);
    return this.repo.create(dto);
  }

  async list(params: { status?: "DRAFT" | "ACTIVE" | "ENDED"; q?: string }) {
    return this.repo.findMany(params);
  }

  async get(id: string) {
    const auction = await this.repo.findById(id);
    if (!auction) throw new AppError("AUCTION_NOT_FOUND", "Auction not found", 404);
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
