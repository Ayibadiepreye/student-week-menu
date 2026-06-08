// @ts-nocheck
import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "../artifacts/api-server/src/routes/index.ts";
import { logger } from "../artifacts/api-server/src/lib/logger.ts";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/", router);

app.use((err: any, req: any, res: any, next: any) => {
  req.log.error(err, "Unhandled error");
  res.status(500).json({ error: "Internal server error" });
});

export default async (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
