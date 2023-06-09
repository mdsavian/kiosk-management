import { json, urlencoded } from "body-parser";
import express from "express";
import cors from "cors";
import router from "./routes";

export const createServer = () => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(router);

  return app;
};
