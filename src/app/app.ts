import express from "express";
import { errorHandler } from "../shared/error.middleware.js";
import { AppError } from "../shared/AppError.js";

// routery
import { categoryRouter } from "../modules/categories/category.routes.js";
import auctionRouter from "../modules/auctions/auction.routes.js";

export const app = express();

app.use(express.json());

// ROUTES
app.use("/api/categories", categoryRouter);
app.use("/api/auctions", auctionRouter);

// 404 dla nieznanych endpointów
app.use((_req, _res, next) => {
  next(new AppError(404, "NOT_FOUND", "Route not found"));
});

app.use(errorHandler);
