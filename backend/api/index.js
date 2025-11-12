import serverless from "serverless-http";
import { app } from "../app.js";
import connectDB from "../db/database.js";

await connectDB();

export const handler = serverless(app);
export default handler;
