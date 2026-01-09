import { createApp } from "./app/app.js";
import { env } from "./config/env.js";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`API running on http://localhost:${env.PORT}`);
});
