import type { Request, Response } from "express";
import { CategoryService } from "./category.service.js";
import { CreateCategorySchema, UpdateCategorySchema } from "./category.schema.js";
import { AppError } from "../../shared/AppError.js";
import { requireCategory } from "./category.helpers.js";

export class CategoryController {
  private service = new CategoryService();

  list = async (_req: Request, res: Response) => {
    const rows = await this.service.list();

    const items = rows.map((c: any) => ({
      id: c.id,
      name: c.name,
      auctionCount: c._count?.auctions ?? 0,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));

    res.status(200).json(items);
  };

  get = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError("BAD_REQUEST", "Missing id", 400);

    const item = await this.service.get(id);
    res.status(200).json(item);
  };

  create = async (req: Request, res: Response) => {
    const def: any = (CreateCategorySchema as any)._def;
    const dto = CreateCategorySchema.parse(req.body);
    const created = await this.service.create(dto);
    res.status(201).json(created);
  };

  listAuctions = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError("BAD_REQUEST", "Missing id", 400);
    await requireCategory(id); 
    const auctions = await this.service.listAuctionsByCategory(id);
    res.status(200).json(auctions);
  };


  update = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError("BAD_REQUEST", "Missing id", 400);
    const dto = UpdateCategorySchema.parse(req.body);
    const updated = await this.service.update(id, dto);
    res.status(200).json(updated);
  };

  remove = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError("BAD_REQUEST", "Missing id", 400);
    await this.service.remove(id);
    res.status(204).send();
  };
}
