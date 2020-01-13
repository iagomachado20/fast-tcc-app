const exp = require('express')
const routes = exp.Router()
const jwt = require('jsonwebtoken')
const middleware = require('./middleware/auth.middleware')

const UserController = require('./controllers/UserController')

// Users Route
routes.post('/login', UserController.login)
routes.post('/register', UserController.insert)
routes.get('/me', middleware.checkToken, UserController.dataUserLogged)

module.exports = routes
