// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})
import connectDB from "./db/database.js";
import { app } from "./app.js";





// Example route
app.get("/", (req, res) => {
  res.send("✅ Serverless Express is running on Vercel!");
});

// ✅ Connect to DB once when function initializes
await connectDB().catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
});

// ✅ Export a serverless handler instead of app.listen()
export const handler = serverless(app);

// Also export default if Vercel expects it
export default handler;






/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/