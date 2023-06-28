const { Router } = require('express')
const { routesFromCategory } = require('./category.routes')
const { routesFromTrainee } = require('./trainee.routes')

const routes = new Router()

routes.use('/api', [routesFromCategory(), routesFromTrainee()])

module.exports = routes