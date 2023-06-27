const { Router } = require('express')
const { routesFromCategory } = require('./category.routes')

const routes = new Router()

routes.use('/api', [routesFromCategory()])

module.exports = routes