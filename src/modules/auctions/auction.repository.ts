import { prisma } from "../../db/prisma.js";
import type { Prisma } from "@prisma/client";
import type { CreateAuctionDto, UpdateAuctionDto } from "./auction.schema.js";

export class AuctionRepository {
  create(dto: CreateAuctionDto) {
    const data: Prisma.AuctionCreateInput = {
      title: dto.title,
      description: dto.description ?? null,
      url: dto.url ?? null,
      status: dto.status ?? "DRAFT",
      currentPrice: dto.currentPrice ?? 0,
      category: { connect: { id: dto.categoryId } }, // <- bez any, zawsze jest
    };

    return prisma.auction.create({
      data,
      include: { category: true },
    });
  }

  findMany(params: { status?: "DRAFT" | "ACTIVE" | "ENDED"; q?: string }) {
    const where: Prisma.AuctionWhereInput = {};

    if (params.status) where.status = params.status;

    if (params.q) {
      where.OR = [
        { title: { contains: params.q } },
        { description: { contains: params.q } },
      ];
    }

    return prisma.auction.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }

  findById(id: string) {
    return prisma.auction.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  findByCategoryId(categoryId: string) {
    return prisma.auction.findMany({
      where: { categoryId },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }

  update(id: string, dto: UpdateAuctionDto) {
    const data: Prisma.AuctionUncheckedUpdateInput = {};

    if (dto.title !== undefined) data.title = dto.title;
    if (dto.description !== undefined) data.description = dto.description ?? null;
    if (dto.url !== undefined) data.url = dto.url ?? null;
    if (dto.status !== undefined) data.status = dto.status;
    if (dto.currentPrice !== undefined) data.currentPrice = dto.currentPrice;

    if (dto.categoryId !== undefined) data.categoryId = dto.categoryId;

    return prisma.auction.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.auction.delete({ where: { id } });
  }
}
