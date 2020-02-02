const { Router } = require('express');

const router = Router();

module.exports = (app) => {
  app.use('/users', router);

  // @route   GET /users
  // @desc    gets all users
  // @access  Public
  router.get('/', (req, res) => res.send('all user data here'));
}