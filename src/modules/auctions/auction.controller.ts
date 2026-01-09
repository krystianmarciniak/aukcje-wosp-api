import type { Request, Response } from "express";
import { AuctionService } from "./auction.service.js";
import { CreateAuctionSchema, UpdateAuctionSchema } from "./auction.schema.js";
import { AppError } from "../../shared/AppError.js";

export class AuctionController {
  private service = new AuctionService();

  create = async (req: Request, res: Response) => {
    const dto = CreateAuctionSchema.parse(req.body);
    const created = await this.service.create(dto);
    res.status(201).json(created);
  };

  list = async (req: Request, res: Response) => {
    const status =
      req.query.status === "DRAFT" || req.query.status === "ACTIVE" || req.query.status === "ENDED"
        ? req.query.status
        : undefined;

    const q = typeof req.query.q === "string" ? req.query.q : undefined;

    const items = await this.service.list({ status, q });
    res.status(200).json(items);
  };

  get = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError(400, "BAD_REQUEST", "Missing id");

    const item = await this.service.get(id);
    res.status(200).json(item);
  };

  update = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError(400, "BAD_REQUEST", "Missing id");

    const dto = UpdateAuctionSchema.parse(req.body);
    const updated = await this.service.update(id, dto);
    res.status(200).json(updated);
  };

  remove = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError(400, "BAD_REQUEST", "Missing id");

    await this.service.remove(id);
    res.status(204).send();
  };
}
