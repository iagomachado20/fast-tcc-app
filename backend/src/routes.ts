const exp = require('express');
const routes = exp.Router();

const UserController = require('./controllers/UserController');
// Users Route
routes.get('/users', UserController.consult);
routes.post('/users', UserController.insert);

module.exports = routes;