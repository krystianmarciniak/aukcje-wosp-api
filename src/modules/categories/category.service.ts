import { AuctionRepository } from "../auctions/auction.repository.js";
import { CategoryRepository } from "./category.repository.js";
import { AppError } from "../../shared/AppError.js";
import type { CreateCategoryDto, UpdateCategoryDto } from "./category.schema.js";

export class CategoryService {
  private repo = new CategoryRepository();
  private auctionsRepo = new AuctionRepository();

  list() {
    return this.repo.findMany();
  }

  async get(id: string) {
    const category = await this.repo.findById(id);
    if (!category) throw new AppError("CATEGORY_NOT_FOUND", "Category not found", 404);
    return category;
  }

  create(dto: CreateCategoryDto) {
    return this.repo.create(dto);
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.get(id);
    return this.repo.update(id, dto);
  }

  async listAuctionsByCategory(categoryId: string) {
    const exists = await this.repo.findById(categoryId);
    if (!exists) {
      throw new AppError("CATEGORY_NOT_FOUND", "Category not found", 404);
    }
    return this.auctionsRepo.findByCategoryId(categoryId);
  }

  async remove(id: string) {
    const category = await this.repo.findByIdWithAuctionCount(id);

    if (!category) {
      throw new AppError("CATEGORY_NOT_FOUND", "Category not found", 404);
    }

    if (category._count.auctions > 0) {
      throw new AppError(
        "CATEGORY_HAS_AUCTIONS",
        "Cannot delete category with auctions",
        409
      );
    }


    await this.repo.delete(id);
  }
}