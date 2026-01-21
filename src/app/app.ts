import express from "express";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "../shared/error.middleware.js";
import { AppError } from "../shared/AppError.js";
import { swaggerSpec } from "../swagger.js"; // ścieżka zależna od struktury

// routery
import { categoryRouter } from "../modules/categories/category.routes.js";
import auctionRouter from "../modules/auctions/auction.routes.js";

export const app = express();

app.use(express.json());

// Swagger NAJPIERW
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
app.use("/api/categories", categoryRouter);
app.use("/api/auctions", auctionRouter);


// 404 NA KOŃCU, dla nieznanych endpointów
app.use((req, res) => {
  res.status(404).json({ error: "NOT_FOUND", message: "Route not found" });
});

app.use(errorHandler);
