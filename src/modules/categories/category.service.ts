import { AppError } from "../../shared/AppError.js";
import type { CreateCategoryDto, UpdateCategoryDto } from "./category.schema.js";
import { CategoryRepository } from "./category.repository.js";
import { prisma } from "../../db/prisma.js";

export class CategoryService {
  constructor(private repo = new CategoryRepository()) { }

  list() {
    return this.repo.findMany();
  }

  async get(id: string) {
    const category = await this.repo.findById(id);
    if (!category) throw new AppError(404, "NOT_FOUND", "Category not found");
    return category;
  }

  create(dto: CreateCategoryDto) {
    return this.repo.create(dto);
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.get(id);
    return this.repo.update(id, dto);
  }

  async auctions(categoryId: string) {
    return prisma.auction.findMany({
      where: { categoryId },
    });
  }

  async remove(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { auctions: true } } },
    });

    if (!category) {
      throw new AppError(404, "CATEGORY_NOT_FOUND", "Category not found");
    }

    if (category._count.auctions > 0) {
      throw new AppError(
        409,
        "CATEGORY_HAS_AUCTIONS",
        "Cannot delete category with auctions"
      );
    }
    await this.repo.delete(id);
  }
}
