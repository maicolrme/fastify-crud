import type { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { sql } from "drizzle-orm";
import { db } from "./db/index.js";
import { userRoutes } from "./routes/user.routes.js";
import { itemRoutes } from "./routes/item.routes.js";

export async function buildApp(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "Fastify Drizzle API",
        description: "API REST con Fastify + Drizzle ORM + PostgreSQL",
        version: "1.0.0",
      },
      servers: [{ url: `http://localhost:${process.env.PORT || 3000}`, description: "Local dev" }],
    },
  });

  await app.register(swaggerUi, { routePrefix: "/docs" });

  app.get("/", async (_req, reply) => {
    return reply.type("text/html").send(`
      <!DOCTYPE html>
      <html>
      <head><title>Fastify Drizzle API</title><meta charset="utf-8"></head>
      <body style="font-family:sans-serif;max-width:600px;margin:40px auto;padding:0 20px">
        <h1>Fastify + Drizzle ORM API</h1>
        <p>API REST con PostgreSQL (Supabase)</p>
        <ul>
          <li><a href="/docs">Swagger UI</a> — documentación interactiva</li>
          <li><a href="/health">Health Check</a> — estado del servidor y DB</li>
        </ul>
        <h2>Endpoints</h2>
        <pre>
GET  /health
GET  /users     POST /users
GET  /users/:id PUT  /users/:id  DELETE /users/:id
GET  /items     POST /items
GET  /items/:id PUT  /items/:id  DELETE /items/:id
        </pre>
      </body>
      </html>
    `);
  });

  app.get("/health", async () => {
    let dbStatus = "disconnected";
    try {
      await db.execute(sql`SELECT 1`);
      dbStatus = "connected";
    } catch {}
    return { status: "ok", database: dbStatus, timestamp: new Date().toISOString() };
  });

  await app.register(userRoutes);
  await app.register(itemRoutes);
}
