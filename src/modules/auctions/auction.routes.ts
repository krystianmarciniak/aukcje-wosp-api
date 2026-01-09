import { Router } from "express";
import { AuctionController } from "./auction.controller.js";
import { asyncHandler } from "../../shared/asyncHandler.js";


const router = Router();
const controller = new AuctionController();

router.post("/", asyncHandler(controller.create));
router.get("/", asyncHandler(controller.list));
router.get("/:id", asyncHandler(controller.get));
router.patch("/:id", asyncHandler(controller.update));
router.delete("/:id", asyncHandler(controller.remove));

export default router;
