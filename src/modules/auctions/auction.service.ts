import { AuctionRepository } from "./auction.repository.js";
import { AppError } from "../../shared/AppError.js";
import type { CreateAuctionDto, UpdateAuctionDto } from "./auction.schema.js";

export class AuctionService {
  constructor(private repo = new AuctionRepository()) { }

  async create(dto: CreateAuctionDto) {
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
