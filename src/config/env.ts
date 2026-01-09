import "dotenv/config";

export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  DATABASE_URL: process.env.DATABASE_URL ?? "file:./dev.sqlite",
};
