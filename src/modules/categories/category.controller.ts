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
      const dto = CreateCategorySchema.parse(req.body);
      const created = await this.service.create(dto);
      return res.status(201).json(created);
    } catch (err: any) {
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
