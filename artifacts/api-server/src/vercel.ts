import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

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

// No /api prefix here because Vercel routes /api/* to this file
app.use("/", router);

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  req.log.error(err, "Unhandled error");
  res.status(500).json({ error: "Internal server error" });
});

export default app;
