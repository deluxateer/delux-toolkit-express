const express = require('express');
const routes = require('../routes');

module.exports = ({ app }) => {
  // Define views and static assets
  app.set('views', __dirname + '/../../src/client/views');
  app.set('view engine', 'pug');
  app.use(express.static(__dirname + '/../../public'));

  // Middleware that transforms the form url encoded data into json
  app.use(express.urlencoded({ extended: true }));
  // Load page routes
  app.use(routes());
};