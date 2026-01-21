import { Router } from "express";
import { CategoryController } from "./category.controller.js";

export const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.post("/", controller.create);
/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Pobiera listę kategorii
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

/**
 * @openapi
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Tworzy nową kategorię
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Elektronika
 *             required: [name]
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *           description: Validation error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'   
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Usuwa kategorię po ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kategorii do usunięcia
 *     responses:
 *       204:
 *         description: Kategoria została pomyślnie usunięta
 *       404:
 *         description: Nie znaleziono kategorii o podanym ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Konflikt - kategoria posiada przypisane produkty/relacje i nie może zostać usunięta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

// Swagger wygląda jak produkt, a nie demo.
categoryRouter.get("/", controller.list);
categoryRouter.get("/:id", controller.get);
categoryRouter.get("/:id/auctions", controller.auctions);
categoryRouter.patch("/:id", controller.update);
categoryRouter.delete("/:id", controller.remove);

export default categoryRouter;
