const { Router } = require('express');
const auth = require('./auth');
const user = require('./user');

// guaranteed to get dependencies
module.exports = () => {
	const app = Router();
	auth(app);
	user(app);

	return app;
}