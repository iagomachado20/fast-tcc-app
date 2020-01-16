const exp = require('express')
const routes = exp.Router()
const jwt = require('jsonwebtoken')
const middleware = require('./middleware/auth.middleware')

// Controllers
const UserController = require('./controllers/UserController')
const EstablishmentController = require('./controllers/EstablishmentController')
const RatingController = require('./controllers/RatingController')
const VacancyController = require('./controllers/VacancyController')

// Users Route
routes.post('/login', UserController.login)
routes.post('/register', UserController.insert)
routes.get('/me', middleware.checkToken, UserController.dataUserLogged)
routes.post('/favorite-establishment', middleware.checkToken, UserController.favoriteEstablishmentToggle)
routes.get('/list-favorites', middleware.checkToken, UserController.listFavoritesEstablishments)

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

// Vagas
routes.post('/request-vacancy', middleware.checkToken, VacancyController.requestVacancy)

routes.get('/counters-vacancy', middleware.checkToken, VacancyController.getCountersVacancy)
routes.get('/list-vacancies-busy', middleware.checkToken, VacancyController.getVacanciesBusy)
routes.post('/canceled-vacancy', middleware.checkToken, VacancyController.canceledVacancy)

module.exports = routes
