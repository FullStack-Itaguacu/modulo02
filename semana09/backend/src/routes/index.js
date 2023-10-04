const { Router } = require('express')
const { routesFromCategory } = require('./category.routes')
const { routesFromTrainee } = require('./trainee.routes')
const { routesFromCompany } = require('./company.routes')
const { routesFromContract } = require('./contract.routes')
const { routesFromUser } = require('./user.routes')
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../utils/swagger-output.json')

const routes = new Router()

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use('/api', routesFromCategory())
routes.use('/api', routesFromTrainee())
routes.use('/api', routesFromCompany())
routes.use('/api', routesFromContract())
routes.use('/api', routesFromUser())


module.exports = routes