import { AppError } from "../../shared/AppError.js";
import { prisma } from "../../db/prisma.js";

export async function requireCategory(categoryId: string) {
  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) {
    throw new AppError("CATEGORY_NOT_FOUND", "Category not found", 404);
  }
  return category;
}
