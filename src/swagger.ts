import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "WOŚP Aukcje API", version: "1.0.0" },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      schemas: {
        ApiError: {
          type: "object",
          properties: {
            error: { type: "string", example: "NOT_FOUND" },
            message: { type: "string", example: "Route not found" },
            details: { nullable: true, example: null },
          },
          required: ["error", "message", "details"],
        },
        CategoryCreateRequest: {
          type: "object",
          properties: { name: { type: "string", example: "Elektronika" } },
          required: ["name"],
        },
        CategoryListItem: {
          type: "object",
          properties: {
            id: { type: "string", example: "clx123abc..." },
            name: { type: "string", example: "Elektronika" },
            auctionCount: { type: "integer", example: 0 },
          },
          required: ["id", "name", "auctionCount"],
        },
        AuctionCreateRequest: {
          type: "object",
          properties: {
            title: { type: "string", example: "Lampa vintage" },
            description: { type: "string", nullable: true, example: "Stan bardzo dobry" },
            status: { type: "string", enum: ["DRAFT", "ACTIVE", "ENDED"], example: "ACTIVE" },
            currentPrice: { type: "number", example: 10 },
            url: { type: "string", nullable: true, example: "https://example.com/aukcja/1" },
            categoryId: { type: "string", example: "clxCatId..." },
          },
          required: ["title", "categoryId"],
        },
        AuctionUpdateRequest: {
          type: "object",
          properties: {
            title: { type: "string", example: "Nowy tytuł" },
            description: { type: "string", nullable: true, example: "Opis" },
            status: { type: "string", enum: ["DRAFT", "ACTIVE", "ENDED"], example: "DRAFT" },
            currentPrice: { type: "number", example: 25 },
            url: { type: "string", nullable: true, example: "https://example.com" },
            categoryId: { type: "string", example: "clxCatId..." },
          },
          additionalProperties: false,
        },
      },
    },
  },
  apis: ["src/modules/**/*.routes.ts"], // <- tu zbiera @openapi
});
