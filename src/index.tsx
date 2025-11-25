import Elysia, { t } from "elysia";
import Swagger from "@elysiajs/swagger";
import html from "./index.html";
import { apiAuth } from "./server/middlewares/apiAuth";
import Auth from "./server/routes/auth_route";
import ApiKeyRoute from "./server/routes/apikey_route";
import type { User } from "generated/prisma";
import { LandingPage } from "./Landing";
import { renderToReadableStream } from "react-dom/server";
import { cors } from "@elysiajs/cors";

const PORT = process.env.PORT || 3000;

const Docs = new Elysia().use(
  Swagger({
    path: "/docs",
  }),
);

const ApiUser = new Elysia({
  prefix: "/user",
}).get("/find", (ctx) => {
  const { user } = ctx as any;
  return {
    user: user as User,
  };
});

const Api = new Elysia({
  prefix: "/api",
})

  .use(apiAuth)
  .use(ApiKeyRoute)
  .use(ApiUser);

const app = new Elysia()
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
    }),
  )
  .use(Api)
  .use(Docs)
  .use(Auth)
  .get("/", async () => {
    const stream = await renderToReadableStream(<LandingPage />);
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  })
  .get("/assets/:name", (ctx) => {
    try {
      const file = Bun.file(`public/${encodeURIComponent(ctx.params.name)}`);
      return new Response(file);
    } catch (error) {
      return new Response("File not found", { status: 404 });
    }
  })
  .get("/*", html)
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

export type ServerApp = typeof app;
