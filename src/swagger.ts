import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API WOŚP Aukcje",
      version: "1.0.0",
      description: "Dokumentacja REST API projektu zaliczeniowego",
    },
    servers: [{ url: "http://localhost:3000" }],

    components: {
      schemas: {
        // Standard błędów w całym API
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "NOT_FOUND" },
            message: { type: "string", example: "Route not found" },
            details: {
              type: "array",
              items: { type: "object" },
              nullable: true,
              example: [],
            },
          },
          required: ["error", "message"],
        },

        // Aukcja
        Auction: {
          type: "object",
          properties: {
            id: { type: "string", example: "cmkaco8fx0000oxwcwqr3t240" },
            title: { type: "string", example: "Słuchawki WOŚP" },
            description: { type: "string", example: "Nowe, zaplombowane" },
            status: { type: "string", example: "ACTIVE" },
            currentPrice: { type: "number", example: 0 },
            categoryId: { type: "string", example: "cmkn37yxi0001oxqkfu3rr5w2" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: ["id", "title", "status", "categoryId"],
        },

        // Kategoria (z relacją do aukcji)
        Category: {
          type: "object",
          properties: {
            id: { type: "string", example: "cmkn37yxi0001oxqkfu3rr5w2" },
            name: { type: "string", example: "Elektronika" },

            // Relacja: kategoria -> lista aukcji
            auctions: {
              type: "array",
              items: { $ref: "#/components/schemas/Auction" },
            },

            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: ["id", "name"],
        },
      },
    },
  },

  // Bierzemy komentarze @openapi z routes
  apis: ["./src/modules/**/*.routes.ts"],
});
