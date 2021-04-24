const express = require("express");
const dotenv = require("dotenv");
const morgon = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

// Routes files
const bootcamps = require("./routes/bootcamps");
const errorHandler = require("./middleware/error");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Connect To Database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Dev logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgon("dev"));
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

// Error Handle Call
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `The server is running on ${PORT} and mode is ${process.env.NODE_ENV}`
      .yellow.bold
  )
);

// Handle Unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close Server & Exit process
  server.close(() => {
    process.exit(1);
  });
});
