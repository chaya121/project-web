// backend/routes/requests.js
const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Create request (student)
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const newRequest = new Request({
      title,
      description,
      user: req.user.id,
      status: 'pending'
    });
    const saved = await newRequest.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
});

// Get all requests (admin only) OR student's own requests
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const list = await Request.find().populate('user', 'name email role');
      return res.json(list);
    } else {
      const list = await Request.find({ user: req.user.id }).populate('user', 'name email');
      return res.json(list);
    }
  } catch (err) { next(err); }
});

// Get single request by id (admin or owner)
router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const reqItem = await Request.findById(req.params.id).populate('user', 'name email role');
    if (!reqItem) return res.status(404).json({ message: 'Request not found' });
    if (req.user.role !== 'admin' && reqItem.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(reqItem);
  } catch (err) { next(err); }
});

// Update request (owner or admin)
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const reqItem = await Request.findById(req.params.id);
    if (!reqItem) return res.status(404).json({ message: 'Request not found' });

    // only admin or owner
    if (req.user.role !== 'admin' && reqItem.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // allow change of title/description/status
    const allowed = ['title','description','status'];
    allowed.forEach(k => {
      if (req.body[k] !== undefined) reqItem[k] = req.body[k];
    });

    const saved = await reqItem.save();
    res.json(saved);
  } catch (err) { next(err); }
});

// Delete request (admin only)  <-- new
router.delete('/:id', authMiddleware, roleMiddleware('admin'), async (req, res, next) => {
  try {
    const reqItem = await Request.findById(req.params.id);
    if (!reqItem) return res.status(404).json({ message: 'Request not found' });
    await reqItem.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;