import { app } from "./app/app.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js"; // <- kluczowa zmiana: .js

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// <- dodaje to: Swagger UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api/docs`);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED_REJECTION:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT_EXCEPTION:", err);
});
