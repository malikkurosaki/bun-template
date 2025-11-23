import Elysia, { t } from "elysia";
import Swagger from "@elysiajs/swagger";
import html from "./index.html";
import Dashboard from "./server/routes/darmasaba";
import { apiAuth } from "./server/middlewares/apiAuth";
import Auth from "./server/routes/auth_route";
import ApiKeyRoute from "./server/routes/apikey_route";
import type { User } from "generated/prisma";

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
  .use(Dashboard)
  .use(ApiUser);

const app = new Elysia()
  .use(Api)
  .use(Docs)
  .use(Auth)
  .get("*", html)
  .listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });

export type ServerApp = typeof app;
