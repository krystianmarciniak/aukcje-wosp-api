import { Router } from "express";
import { CategoryController } from "./category.controller.js";

const router = Router();
const controller = new CategoryController();

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.get);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
