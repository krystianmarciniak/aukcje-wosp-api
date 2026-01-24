import { Router } from "express";
import { getExternalPosts } from "./external.controller.js";

export const externalRouter = Router();

externalRouter.get("/posts", getExternalPosts);

/**
 * @openapi
 * tags:
 *   - name: External
 *     description: Integracje z zewnętrznym API
 */

/**
 * @openapi
 * /api/external/posts:
 *   get:
 *     tags: [External]
 *     summary: Pobiera dane z zewnętrznego API (JSONPlaceholder)
 *     description: Zwraca 5 przykładowych wpisów pobranych z zewnętrznego serwisu.
 *     responses:
 *       200:
 *         description: Lista postów (limit 5)
 *       502:
 *         description: Błąd integracji z zewnętrznym API
 */
