import app from "./app";

export default async function handler(req: any, res: any) {
  // Vercel gives us Node.js req/res objects
  await app(req, res);
}
