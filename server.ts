import "dotenv/config";
import Fastify from "fastify";
import { buildApp } from "./src/build-app.js";

const fastify = Fastify({ logger: true });
await buildApp(fastify);
const PORT = parseInt(process.env.PORT || "3000", 10);

try {
  await fastify.listen({ port: PORT, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
