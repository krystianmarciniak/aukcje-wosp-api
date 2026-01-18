import { app } from "./app/app.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED_REJECTION:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT_EXCEPTION:", err);
});
