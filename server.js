// Module Imports
const path = require('path')
const express = require("express");
const dotenv = require("dotenv");
const morgon = require("morgan");
const colors = require("colors");
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

// File Imports
const connectDB = require("./config/db");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Routes files
const bootcamps = require("./routes/bootcamps");
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');
const errorHandler = require("./middleware/error");

// Connect To Database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// To remove data, use:
app.use(mongoSanitize());

// Set Security headers:
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100
})

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Cookie Parser
app.use(cookieParser());

// Dev logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgon("dev"));
}

// Const

// File uploading Middleware
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

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
