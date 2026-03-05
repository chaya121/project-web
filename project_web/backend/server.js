// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requests');
const userRoutes = require('./routes/users');

const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// basic security
app.use(helmet());
app.use(cors());
app.use(express.json());

// logging and rate limiting
app.use(morgan('combined'));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// routes
app.use('/auth', authRoutes);
app.use('/requests', requestRoutes);
app.use('/users', userRoutes);

// health
app.get('/ping', (req, res) => res.json({ ok: true }));

// error handler (หลัง routes)
app.use(errorMiddleware);

// connect DB and start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/projectdb';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  }).catch(err => {
    console.error('Mongo connect error', err);
  });