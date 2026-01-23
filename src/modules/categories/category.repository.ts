import { prisma } from "../../db/prisma.js";
import type { CreateCategoryDto, UpdateCategoryDto } from "./category.schema.js";

const stripUndefined = <T extends Record<string, any>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>;

export class CategoryRepository {
  create(data: CreateCategoryDto) {
  return prisma.category.create({ data: { name: data.name } });
}


  findMany() {
    return prisma.category.findMany({
      include: {
        _count: {
          select: { auctions: true },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  findByIdWithAuctionCount(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { auctions: true } } },
    });
  }

  findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: { auctions: true },
    });
  }

  countAuctions(categoryId: string) {
  return prisma.auction.count({ where: { categoryId } });
  }


  update(id: string, data: UpdateCategoryDto) {
    const clean = stripUndefined(data);
    return prisma.category.update({ where: { id }, data: clean as any });
  }

  delete(id: string) {
    return prisma.category.delete({ where: { id } });
  }
}


