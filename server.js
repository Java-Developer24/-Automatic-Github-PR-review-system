import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import webhookRoutes from "./routes/webhook.js";

dotenv.config(); // Load environment variables from .env file
const app = express(); // Create an Express app

app.use(cors()); // Enable CORS
app.use(express.static("public")); // Serve static files from the public directory
app.use(express.json()); // Parse JSON bodies
connectDB(); // Connect to your database

app.use('/auth', authRoutes); // Use authentication routes
app.use('/webhook', webhookRoutes);

const port = process.env.PORT || 3000; // Set the port from environment variable or default to 3000

app.listen(port, async () => {
    console.log(`Server is running on port http://localhost:${port}`);

   
});
