const exp = require('express')
const routes = exp.Router()
const jwt = require('jsonwebtoken')
const middleware = require('./middleware/auth.middleware')

const UserController = require('./controllers/UserController')
const EstablishmentController = require('./controllers/EstablishmentController')
const RatingController = require('./controllers/RatingController')

// Users Route
routes.post('/login', UserController.login)
routes.post('/register', UserController.insert)
routes.get('/me', middleware.checkToken, UserController.dataUserLogged)

// Estabelecimentos Rotas
routes.get('/establishments', middleware.checkToken, EstablishmentController.getEstablishments)
routes.put('/flag-establishments', middleware.checkToken, EstablishmentController.changeStatus)
routes.get(
  '/establishments/:name',
  middleware.checkToken,
  EstablishmentController.getEstablishments
)

// Rating
routes.post('/evaluate', middleware.checkToken, RatingController.setRatingEstablishment)

module.exports = routes
