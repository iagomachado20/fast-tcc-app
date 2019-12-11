const exp = require('express');
const routes = exp.Router();
let jwt = require('jsonwebtoken');
let middleware = require('./middleware/auth.middleware');

const UserController = require('./controllers/UserController');

// Users Route
routes.post('/login', UserController.login);
routes.post('/users', UserController.insert);
routes.get('/me', middleware.checkToken, UserController.dataUserLogged);

module.exports = routes;