const express = require('express');
const dotenv = require('dotenv');

// Routes files
const bootcamps = require('./routes/bootcamps');

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`The server is running on ${PORT} and mode is ${process.env.NODE_ENV}`))