import { buildApp } from "../src/build-app.js";

let app: Awaited<ReturnType<typeof buildApp>>;

export default async function handler(req: any, res: any) {
  if (!app) {
    app = await buildApp();
    await app.ready();
  }
  app.server.emit("request", req, res);
}
