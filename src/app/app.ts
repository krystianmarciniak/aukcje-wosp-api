import express from "express";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "../shared/error.middleware.js";
import { AppError } from "../shared/AppError.js";
import { swaggerSpec } from "../swagger.js";
import categoryRouter from "../modules/categories/category.routes.js";
import auctionRouter from "../modules/auctions/auction.routes.js";

export const app = express();

app.use(express.json());

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/categories", categoryRouter);
app.use("/api/auctions", auctionRouter);

// 404 -> AppError -> errorHandler (spójny format)
app.use((req, res, next) => {
  next(new AppError("NOT_FOUND", "Route not found", 404));
});

app.use(errorHandler);
