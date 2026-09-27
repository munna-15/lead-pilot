import dns from "dns";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import leadRoutes from "./routes/lead.routes.js";
import automationRoutes from "./routes/automation.routes.js";

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
])

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "LeadPilot API is running",
  });
});


app.use("/api/leads", leadRoutes);
app.use("/api/automations", automationRoutes);



const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`LeadPilot API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
