const { Router } = require('express');
const AuthService = require('../services/auth');
// const middlewares = require('./middleware');
const { routes: { api } } = require('../config');

const router = Router();

module.exports = (app) => {
  app.use(api + '/auth', router);

  router.post('/signup', async (req, res, next) => {
      try {
        const authServiceInstance = new AuthService({ username: 'username' });
        await authServiceInstance.SignUp(req.body);
        return res.status(201).json({ user, token });
      } catch (err) {
        console.log(err);
        return next(e);
      }
    },
  );

  router.post('/signin', async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const { user, token } = await authServiceInstance.SignIn(email, password);
        return res.json({ user, token }).status(200);
      } catch (err) {
        console.log(err);
        return next(e);
      }
    },
  );
};