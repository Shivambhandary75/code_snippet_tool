const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL in backend/.env');
  process.exit(1);
}
if (!process.env.TOKEN_KEY && !process.env.JWT_SECRET) {
  console.error('Missing TOKEN_KEY (or JWT_SECRET) in backend/.env');
  process.exit(1);
}

const app = express();

const snippetRoutes = require("./routes/snippetRoute");
const AuthRoute = require("./routes/AuthRoute");

const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", AuthRoute);
app.use("/api/snippets", snippetRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT || 3000}`);
});
