import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import defaultHook from "stoker/openapi/default-hook";

import { logger } from "../middlewares/pino-logger";
import type { AppBindings } from "./types.ts";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp(isBaseApp: boolean = false) {
  let app;

  if (isBaseApp) {
    app = createRouter().basePath("/api");
  } else {
    app = createRouter();
  }

  app.use(serveEmojiFavicon("👋"));
  app.use(logger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
