const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, ".env");

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf8");

  envFile.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);

    if (!match) {
      return;
    }

    const key = match[1];
    const value = match[2].replace(/^["']|["']$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
}

mongoose.set("bufferCommands", false);

if (!process.env.MONGO_URI) {
  console.log("DB Error: MONGO_URI is missing. Add it to a .env file before submitting the contact form.");
} else {
  mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("DB Error:", err.message));
}

module.exports = mongoose;
