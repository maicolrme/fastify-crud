import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { buildApp } from "../src/app.js";

let app: Awaited<ReturnType<typeof buildApp>>;

export default async function handler(req: any, res: any) {
  if (!app) {
    const client = postgres(process.env.DATABASE_URL!, { max: 1 });
    const db = drizzle(client);
    try {
      await migrate(db, { migrationsFolder: "./drizzle" });
    } catch (e: any) {
      if (e?.code !== "42P07") throw e;
    }
    await client.end();

    app = await buildApp();
    await app.ready();
  }
  app.server.emit("request", req, res);
}
