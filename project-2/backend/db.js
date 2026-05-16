const mongoose = require("mongoose");

async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Add it to backend/.env");
  }

  await mongoose.connect(process.env.MONGO_URI, {
    dbName: "task_manager",
    serverSelectionTimeoutMS: 10000,
  });

  console.log("MongoDB Connected");
}

module.exports = connectDB;
