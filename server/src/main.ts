import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { logger } from "@chneau/elysia-logger";
import mongoose from "mongoose";
import swagger from "@elysiajs/swagger";
import { BaseRouter } from "./routes/baserouter";

const app = new Elysia();

app.use(logger());
app.use(cors());

try {
  await mongoose
    .connect(process.env.MONGO_URI as string, {
      dbName: "E-wallet",
    })
    .then(() => console.log("Database Connected"));
} catch (error: any) {
  console.log(error);
}

app.use(
  swagger({
    autoDarkMode: true,
    path: "/api/docs",
    documentation: {
      info: {
        title: "E-Wallet API Documentation",
        version: "1.0.0",
      },
    },
  })
);

app.onError(({ error }) => {
  return {
    message: error,
  };
});

app.use(BaseRouter);
// http://192.168.84.171:5173/
// const HOST = process.env.HOST || "localhost";
// const PORT = process.env.PORT || 4000;
const HOST = "192.168.84.171";
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
  console.log(`Checkout the docs at http://${HOST}:${PORT}/api/docs`);
});
