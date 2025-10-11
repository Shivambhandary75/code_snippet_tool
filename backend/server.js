const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const snippetRoutes = require('./routes/snippetRoute');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '200kb' }));
app.use(morgan('dev'));

// routes
app.use('/api/snippets', snippetRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  const mongo = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/snippets_db';
  try {
    await mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();

module.exports = app;
//server.js
