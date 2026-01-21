import type { Request, Response } from "express";
import { CreateCategorySchema, UpdateCategorySchema } from "./category.schema.js";
import { CategoryService } from "./category.service.js";
import { AppError } from "../../shared/AppError.js";
import { prisma } from "../../db/prisma.js";

export class CategoryController {
  private service = new CategoryService();

  list = async (_req: Request, res: Response) => {
    const items = await this.service.list();
    res.status(200).json(items);
  };


  get = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError(400, "BAD_REQUEST", "Missing id");
    const item = await this.service.get(id);
    res.status(200).json(item);
  };

  create = async (req: Request, res: Response) => {
    try {
      // 1) Walidacja wejścia (Zod)
      const dto = CreateCategorySchema.parse(req.body);

      // 2) Logika biznesowa / zapis do bazy (Prisma w serwisie/repo)
      const created = await this.service.create(dto);

      // 3) Odpowiedź HTTP
      return res.status(201).json(created);
    } catch (err: any) {
      // 4) Najważniejsze: NIE res.json w catch,
      // tylko przekazanie do globalnego errorHandler


      if (err?.code === "P2002") {
        return res.status(409).json({
          error: "CATEGORY_ALREADY_EXISTS",
          message: "Category with this name already exists.",
        });
      }
      console.error(err);
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
  };

  update = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError(400, "BAD_REQUEST", "Missing id");

    const dto = UpdateCategorySchema.parse(req.body);
    const updated = await this.service.update(id, dto);
    res.status(200).json(updated);
  };

  remove = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError(400, "BAD_REQUEST", "Missing id");
    await this.service.remove(id);
    res.status(204).send();
  };

  auctions = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError(400, "BAD_REQUEST", "Missing id");

    const items = await this.service.auctions(id);
    return res.status(200).json(items);
  };
}
