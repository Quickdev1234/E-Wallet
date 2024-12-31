import Elysia from "elysia";
import { UserRouter } from "./user";

const BaseRouter = new Elysia({
  prefix: "/api",
}).use(UserRouter);

export { BaseRouter };
