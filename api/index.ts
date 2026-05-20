let app: Awaited<ReturnType<typeof import("../src/app.js").buildApp>>;

export default async function handler(req: any, res: any) {
  if (!app) {
    const { buildApp } = await import("../src/app.js");
    app = await buildApp();
    await app.ready();
  }
  app.server.emit("request", req, res);
}
