import type { Request, Response } from "express";
import { AppError } from "../../shared/AppError.js";
import { ExternalService } from "./external.service.js";

const service = new ExternalService();

export async function getExternalPosts(_req: Request, res: Response) {
  try {
    const data = await service.getPosts();
    res.status(200).json(data.slice(0, 5));
  } catch {
    throw new AppError("EXTERNAL_API_ERROR", "External API error", 502);
  }
}
