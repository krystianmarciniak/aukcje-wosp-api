import { Router } from "express";
import { AuctionController } from "./auction.controller.js";
import { asyncHandler } from "../../shared/asyncHandler.js";


const router = Router();
const controller = new AuctionController();

router.post("/", asyncHandler(controller.create));
/**
 * @openapi
 * /api/auctions:
 *   post:
 *     tags: [Auctions]
 *     summary: Tworzy nową aukcję
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auction'
 *     responses:
 *       201:
 *         description: Aukcja utworzona
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auction'
 *       400:
 *         description: Błąd walidacji
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Konflikt (np. niepoprawna relacja)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get("/", asyncHandler(controller.list));
/**
 * @openapi
 * /api/auctions:
 *   get:
 *     tags: [Auctions]
 *     summary: Pobiera listę aukcji
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [DRAFT, ACTIVE, ENDED]
 *         description: Filtr po statusie aukcji
 *     responses:
 *       200:
 *         description: Lista aukcji
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auction'
 */

router.get("/:id", asyncHandler(controller.get));
/**
 * @openapi
 * /api/auctions/{id}:
 *   get:
 *     tags: [Auctions]
 *     summary: Pobiera aukcję po ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aukcja
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auction'
 *       404:
 *         description: Aukcja nie znaleziona
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.patch("/:id", asyncHandler(controller.update));
/**
 * @openapi
 * /api/auctions/{id}:
 *   patch:
 *     tags: [Auctions]
 *     summary: Aktualizuje aukcję
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auction'
 *     responses:
 *       200:
 *         description: Aukcja zaktualizowana
 *       400:
 *         description: Błąd walidacji
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Aukcja nie znaleziona
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.delete("/:id", asyncHandler(controller.remove));
/**
 * @openapi
 * /api/auctions/{id}:
 *   delete:
 *     tags: [Auctions]
 *     summary: Usuwa aukcję
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Aukcja usunięta
 *       404:
 *         description: Aukcja nie znaleziona
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


export default router;
