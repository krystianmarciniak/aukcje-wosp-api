import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { AppError } from "../shared/AppError.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // 1. Zod - Błędy walidacji schematów
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Invalid request data",
      details: err.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    });
  }

  // 2. AppError - Twoja niestandardowa klasa błędów biznesowych
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.code,
      message: err.message,
    });
  }

  // 3. Prisma - Błędy bazy danych (Constraints, Not Found)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "NOT_FOUND",
        message: "Resource not found",
      });
    }

    if (err.code === "P2002") {
      return res.status(409).json({
        error: "CONFLICT",
        message: "Resource already exists",
        details: err.meta ? [err.meta] : [],
      });
    }

    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Database request error",
      details: [{ prismaCode: err.code }],
    });
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Invalid data for database operation",
    });
  }

  // 4. Obsługa błędów po kodach tekstowych (np. z bibliotek zewnętrznych lub prostych obiektów)
  if (err?.code === "CONFLICT") {
    return res.status(409).json({
      error: "CONFLICT",
      message: err.message ?? "Conflict",
    });
  }

  if (err?.code === "NOT_FOUND") {
    return res.status(404).json({
      error: "NOT_FOUND",
      message: err.message ?? "Not found",
    });
  }

  // 5. Fallback - Nieobsłużone błędy (Internal Server Error)
  console.error("Unhandled error:", err);
  return res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: err instanceof Error ? err.message : "Something went wrong",
  });
};