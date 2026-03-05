// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// GET /users  (admin only)
router.get('/', authMiddleware, roleMiddleware('admin'), async (req, res, next) => {
  try {
    const users = await User.find().select('-password'); // hide password
    res.json(users);
  } catch (err) { next(err); }
});

module.exports = router;