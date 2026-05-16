require("dotenv").config();

const cors = require("cors");
const express = require("express");

const { login, me, register } = require("./authController");
const connectDB = require("./db");
const protect = require("./authMiddleware");
const {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} = require("./taskController");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "task-manager" });
});

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.get("/api/auth/me", protect, me);

app.get("/api/tasks", protect, getTasks);
app.post("/api/tasks", protect, createTask);
app.put("/api/tasks/:id", protect, updateTask);
app.delete("/api/tasks/:id", protect, deleteTask);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Task Manager API running at http://127.0.0.1:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB Error:", error.message);
    process.exit(1);
  });
