import { ZodError } from "zod";
import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "./AppError.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {

  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: err.code,
      message: err.message,
      details: err.details ?? null,
    });
  }

  // 1.5) Zod validation error -> 400
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Invalid request data",
      details: err.flatten(),
    });
  }

  // 2) Prisma: KnownRequestError (np. P2025, P2002...)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2025: rekord nie znaleziony
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "NOT_FOUND",
        message: "Resource not found",
        details: null,
      });
    }

    // P2002: naruszenie unikalności (np. ten sam e-mail)
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "CONFLICT",
        message: "Unique constraint violation",
        details: null,
      });
    }

    // P2003: błąd klucza obcego
    if (err.code === "P2003") {
      return res.status(409).json({
        error: "FK_CONSTRAINT",
        message: "Operation violates relation constraint",
      });
    }

    // Inne błędy Prisma z kodem
    return res.status(400).json({
      error: "PRISMA_ERROR",
      message: `Database error: ${err.code}`,
    });
  }

  // 3) Prisma: ValidationError (np. błędne typy danych przesłane do query)
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Invalid input data for database operation",
      details: null,
    });
  }

  // 4) Fallback: Nieobsłużone błędy (500)
  console.error("UNHANDLED_ERROR:", err);
  return res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong",
    details: null,
  });
};
