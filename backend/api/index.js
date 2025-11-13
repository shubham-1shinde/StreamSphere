import serverless from "serverless-http";
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})
import connectDB from "../db/database.js";
import { app } from "../app.js";

let isConnected = false;

async function ensureDBConnection() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("✅ MongoDB connected (Vercel serverless)");
  }
}

app.use(async (req, res, next) => {
  await ensureDBConnection();
  next();
});

export const handler = serverless(app);
