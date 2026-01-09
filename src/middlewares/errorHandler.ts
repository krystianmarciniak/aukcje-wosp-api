import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../shared/AppError.js";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  // Zod validation errors => 400
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      details: err.issues.map(i => ({ path: i.path.join("."), message: i.message })),
    });
  }

  // Custom app errors => statusCode
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.code,
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
}
