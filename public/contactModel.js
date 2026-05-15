const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const Contact = require("./contactModel");
require("./db");

// ─── MIDDLEWARE ───────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (index.html, style.css, javascript.js)
app.use(express.static(path.join(__dirname)));

// ─── CONTACT ROUTE ────────────────────────────────────────
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log("Received:", { name, email, message });

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.json({ success: true, message: "Message Saved Successfully!" });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ success: false, message: "Error saving message" });
  }
});

// ─── START ────────────────────────────────────────────────
app.listen(3000, () => {
  console.log("✅ Server running at http://127.0.0.1:3000");
});