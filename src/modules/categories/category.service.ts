import { AppError } from "../../shared/AppError.js";
import type { CreateCategoryDto, UpdateCategoryDto } from "./category.schema.js";
import { CategoryRepository } from "./category.repository.js";

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

  async remove(id: string) {
    await this.get(id);
    return this.repo.delete(id);
  }
}
