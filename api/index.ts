// @ts-nocheck
import app from "../artifacts/api-server/src/vercel.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async (req: VercelRequest, res: VercelResponse) => {
  // @ts-ignore
  return app(req, res);
};
