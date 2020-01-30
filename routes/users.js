const express = require('express');

const router = express.Router();

// @route   POST api/users
// @desc    gets all users
// @access  Public
router.get('/', (req, res) => res.send('all user data here'));

module.exports = router;