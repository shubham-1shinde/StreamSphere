import serverless from "serverless-http";
import { app } from "../backend/app.js";
import connectDB from "../backend/db/connect.js";

await connectDB();

export const handler = serverless(app);
export default handler;
