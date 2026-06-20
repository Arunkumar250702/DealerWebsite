const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const { connectDatabase, isDatabaseConnected } = require("./config/database");
require("dotenv").config();

const app = express();
const frontendPath = path.join(__dirname, "../frontend");

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing. Add it to backend/.env");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(express.static(frontendPath));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: isDatabaseConnected() ? "connected" : "disconnected",
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "Not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDatabase();
  } catch (err) {
    console.error("❌ Startup failed:", err.message);
    process.exit(1);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

start();
