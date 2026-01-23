import { prisma } from "../src/db/prisma.js";
import { beforeEach, afterAll } from "@jest/globals";

beforeEach(async () => {
  // kolejność ma znaczenie, jeśli są FK (Auction zwykle zależy od Category)
  await prisma.auction.deleteMany();

  // jeśli masz User w schemacie i Auction do niego referuje, to:
  // await prisma.user.deleteMany();

  await prisma.category.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
