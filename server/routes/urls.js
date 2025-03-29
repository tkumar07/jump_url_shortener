const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const auth = require('../middleware/auth');

// @route   POST api/urls
// @desc    Create a short URL
// @access  Private
router.post('/', auth, async (req, res) => {
  const { originalUrl } = req.body;
  
  try {
    const url = await Url.create(originalUrl, req.user.id);
    res.json(url);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/urls
// @desc    Get all URLs for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const urls = await Url.findByUserId(req.user.id);
    res.json(urls);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;