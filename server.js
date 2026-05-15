const express = require("express");
const cors = require("cors");
const path = require("path");

const Contact = require("./contactModel");
const mongoose = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;
const publicDir = path.join(__dirname, "public");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected",
      });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.json({ success: true, message: "Message saved successfully" });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ success: false, message: "Error saving message" });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request",
    });
  }

  next(err);
});

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
