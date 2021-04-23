const express = require("express");
const dotenv = require("dotenv");
const morgon = require("morgan");
const connectDB = require("./config/db");

// Routes files
const bootcamps = require("./routes/bootcamps");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Connect To Database
connectDB();

const app = express();

// Dev logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgon("dev"));
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `The server is running on ${PORT} and mode is ${process.env.NODE_ENV}`
  )
);

// Handle Unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close Server & Exit process
  server.close(() => {
    process.exit(1);
  });
});
