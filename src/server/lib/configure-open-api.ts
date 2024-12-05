import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types.js";

import packageJSON from "../../../package.json" with {type: "json"};

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "NextJS Hono Open API template",
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "deepSpace",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      spec: {
        url: "/api/doc",
      },
    }),
  );
}
