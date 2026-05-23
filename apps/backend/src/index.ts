import "dotenv/config";
import express from "express";
import { createServer } from "http";
import cors from "cors";
import { connectDB } from "./config/database";
import { connectRedis } from "./config/redis";
import { initSocket } from "./socket/socket";
import { startWorker } from "./workers/assignmentWorker";
import assignmentRoutes from "./routes/assignments";

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/assignments", assignmentRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start everything
const start = async () => {
  await connectDB();
  await connectRedis();
  initSocket(httpServer);
  startWorker();

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();