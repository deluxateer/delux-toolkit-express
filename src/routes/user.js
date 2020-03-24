const { Router } = require('express');
const { routes: { api } } = require('../config');

const router = Router();

module.exports = (app) => {
  app.use(api + '/users', router);

  // @route   GET /users
  // @desc    gets all users
  // @access  Public
  router.get('/', (req, res) => res.send('all user data here'));
}