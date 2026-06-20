const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const frontendPath = path.join(__dirname, "../frontend");

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing. Add it to backend/.env");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing. Add it to backend/.env");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(express.static(frontendPath));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error");
    console.log(err.message);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});