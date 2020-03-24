const { Router } = require('express');
const auth = require('./auth');
const pages = require('./pages');
const user = require('./user');

// guaranteed to get dependencies
module.exports = () => {
	const app = Router();
	auth(app);
	pages(app);
	user(app);

	return app;
}