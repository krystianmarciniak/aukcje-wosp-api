import { prisma } from "../../db/prisma.js";
import type { CreateAuctionDto, UpdateAuctionDto } from "./auction.schema.js";

const stripUndefined = <T extends Record<string, any>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as {
    [K in keyof T as T[K] extends undefined ? never : K]: Exclude<T[K], undefined>;
  };


export class AuctionRepository {
  async create(data: CreateAuctionDto) {
    return prisma.auction.create({ data: stripUndefined(data) });
  }

  async findMany(params: { status?: "DRAFT" | "ACTIVE" | "ENDED"; q?: string } = {}) {
    const { status, q } = params;

    return prisma.auction.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(q
          ? {
            OR: [
              { title: { contains: q } },
              { description: { contains: q } },
            ],
          }
          : {}),
      },
      orderBy: { createdAt: "desc" },
    });
  }


  async findById(id: string) {
    return prisma.auction.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateAuctionDto) {
    const clean = stripUndefined(data);
    return prisma.auction.update({ where: { id }, data: clean });
  }

  async delete(id: string) {
    return prisma.auction.delete({ where: { id } });
  }
}
