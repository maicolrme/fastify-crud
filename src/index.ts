import "dotenv/config";
import { buildApp } from "./build-app.js";

const app = await buildApp();
const PORT = parseInt(process.env.PORT || "3000", 10);

try {
  await app.listen({ port: PORT, host: "0.0.0.0" });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
