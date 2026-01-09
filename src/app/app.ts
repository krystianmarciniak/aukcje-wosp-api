import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorHandler } from "../middlewares/errorHandler.js";
import auctionsRouter from "../modules/auctions/auction.routes.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use(helmet());
  app.use(cors({ origin: true }));
  app.use(rateLimit({ windowMs: 60_000, max: 120 }));

  app.get("/", (_req, res) => {
    res.status(200).json({
      message: "Aukcje WOŚP API",
      health: "/health",
      auctions: "/api/auctions",
    });
  });


  app.use("/api/auctions", auctionsRouter);

  app.use(errorHandler);
  return app;
}