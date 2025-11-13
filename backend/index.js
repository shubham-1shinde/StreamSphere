import dotenv from "dotenv";
import connectDB from "./db/database.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

// ✅ Connect to MongoDB once (outside handler)
await connectDB().catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
});

// ✅ Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Express backend is live on Vercel (serverless)"
  });
});

// ✅ Export the app instead of listening (important!)
export default app;




// require('dotenv').config({path: './env'})
/*import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})
import connectDB from "./db/database.js";
import { app } from "./app.js";



// ✅ Connect to MongoDB
await connectDB().catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
});

// ✅ Example route (you can remove this if you already have one)
app.get("/", (req, res) => {
  res.send("✅ Express backend is running successfully on Render!");
});

// ✅ Start Express server normally (Render needs this)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

*/
/*

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

*/




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