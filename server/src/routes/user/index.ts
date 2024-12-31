import Elysia from "elysia";
import { UserAuthRouter } from "./auth-router";
import { CardRouter } from "./card-router";
import { jwt } from "../../lib/jwt";

const UserRouter = new Elysia({
  prefix: "/user",
})
  .use(UserAuthRouter)
  .onBeforeHandle(({ headers, set, store }: any) => {
    try {
      const token = headers["authorization"];
      if (!token) {
        set.status = 401;
        return {
          message: "Token not found",
        };
      }

      const bearerToken = token.split(" ");

      const decrypt: any = jwt.verify(bearerToken[1]);
      if (!decrypt) {
        set.status = 401;
        return {
          error: "Invalid token",
        };
      }
      store["id"] = decrypt.id;
      store["email"] = decrypt.email;
    } catch (error: any) {
      console.log(error);
      set.status = 401;
      return {
        error: error.message,
      };
    }
  })
  .use(CardRouter);

export { UserRouter };
