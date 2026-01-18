import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "./AppError.js"; // dostosuj ścieżkę

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // 1) Twoje kontrolowane błędy
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.code,
      message: err.message,
    });
  }

  // 2) Prisma: KnownRequestError (np. P2025, P2002...)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2025: rekord nie znaleziony do update/delete
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "NOT_FOUND",
        message: "Resource not found",
      });
    }

    // P2002: unique constraint failed
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "CONFLICT",
        message: "Unique constraint violation",
      });
    }

    // P2003: foreign key constraint failed
    if (err.code === "P2003") {
      return res.status(409).json({
        error: "FK_CONSTRAINT",
        message: "Operation violates relation constraint",
      });
    }

    // inne kody Prisma
    return res.status(400).json({
      error: "PRISMA_ERROR",
      message: `Prisma error: ${err.code}`,
    });
  }

  // 3) Prisma: ValidationError (np. zły typ danych)
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Invalid input data",
    });
  }

  // 4) Fallback: log + 500
  console.error("UNHANDLED_ERROR:", err);
  return res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong",
  });
}
