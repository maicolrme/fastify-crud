import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { buildApp } from "../src/app.js";

async function init() {
  console.log("[init] Running migrations...");
  try {
    const client = postgres(process.env.DATABASE_URL!, { max: 1 });
    const db = drizzle(client);
    await migrate(db, { migrationsFolder: "./drizzle" });
    await client.end();
    console.log("[init] Migrations done");
  } catch (e: any) {
    if (e?.code === "42P07") {
      console.log("[init] Tables already exist, skipping migrations");
    } else {
      console.error("[init] Migration error:", e);
      throw e;
    }
  }

  console.log("[init] Building app...");
  const app = await buildApp();
  await app.ready();
  console.log("[init] App ready");
  return app;
}

const appPromise = init();

export default async function handler(req: any, res: any) {
  try {
    const app = await appPromise;
    app.server.emit("request", req, res);
  } catch (e) {
    console.error("[handler] Fatal error:", e);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
