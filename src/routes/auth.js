const { Router } = require('express');
const AuthService = require('../services/auth');
const middlewares = require('./middleware');

const route = Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.post(
    '/signup',
    async (req, res, next) => {
      try {
        // const { user, token } = await authServiceInstance.SignUp(req.body);
        return res.status(201).json({ user, token });
      } catch (err) {
        console.log(err);
        return next(e);
      }
    },
  );

  route.post(
    '/signin',
    async (req, res, next) => {
      try {
        const { email, password } = req.body;
        // const { user, token } = await authServiceInstance.SignIn(email, password);
        return res.json({ user, token }).status(200);
      } catch (err) {
        console.log(err);
        return next(e);
      }
    },
  );
  
  // route.post('/logout', middlewares.isAuth, (req, res, next) => {
  //   try {
  //     return res.status(200).end();
  //   } catch (err) {
  //     console.log(err);
  //     return next(e);
  //   }
  // });
};