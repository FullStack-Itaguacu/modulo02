const { Router } = require('express')
const { routesFromCategory } = require('./category.routes')
const { routesFromTrainee } = require('./trainee.routes')
const { routesFromCompany } = require('./company.routes')
const { routesFromContract } = require('./contract.routes')
const { routesFromUser } = require('./user.routes')
const { routesFromRBAC } = require('./rbac.routes')

const routes = new Router()

routes.use('/api', [
  routesFromCategory(),
  routesFromTrainee(),
  routesFromCompany(),
  routesFromContract(),
  routesFromUser(),
  routesFromRBAC()
])

module.exports = routes