// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import gradeRoutes from "./routes/gradeRoutes.js";
import wordRoutes from "./routes/wordRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// basic root
app.get("/", (req, res) => res.send("Kids Tamil Learning API running"));
app.use("/api/grades", gradeRoutes);
app.use("/api/words", wordRoutes);

// simple DB status endpoint
app.get("/api/dbstatus", (req, res) => {
  const states = ["disconnected","connected","connecting","disconnecting"];
  res.json({ mongoState: states[mongoose.connection.readyState] });
});

// connect DB then start server
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Could not start server because DB failed to connect.");
  });
