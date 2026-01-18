import { Router } from "express";
import { CategoryController } from "./category.controller.js";

export const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.post("/", controller.create);
categoryRouter.get("/", controller.list);
categoryRouter.get("/:id", controller.get);
categoryRouter.get("/:id/auctions", controller.auctions);
categoryRouter.patch("/:id", controller.update);
categoryRouter.delete("/:id", controller.remove);

export default categoryRouter;
