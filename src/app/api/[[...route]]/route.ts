import { handle } from "hono/vercel";

import { configureOpenAPI } from "../../../server/lib/configure-open-api";
import createApp from "../../../server/lib/create-app";
import index from "../../../server/routes/index.route";

export const runtime = "nodejs";

const app = createApp(true);

configureOpenAPI(app);

app.get("/", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

app.route("/greet", index);

export const GET = handle(app);
export const POST = handle(app);
