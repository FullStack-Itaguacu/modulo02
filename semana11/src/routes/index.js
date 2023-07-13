const { routesFromPermission } = require('./permission.routes')
const { routesFromRole } = require('./role.routes')
const { routesFromUser } = require('./user.routes')
const { Router } = require('express')

const routes = Router()

routes.use('/api', [routesFromUser(), routesFromPermission(), routesFromRole()])

module.exports = routes