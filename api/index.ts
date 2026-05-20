import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

type App = Awaited<ReturnType<typeof import("../src/app.js").buildApp>>;

let app: App;

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

    const { buildApp } = await import("../src/app.js");
    app = await buildApp();
    await app.ready();
  }
  app.server.emit("request", req, res);
}
