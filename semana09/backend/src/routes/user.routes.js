const { Router } = require('express')
const { createOneUser, listAllUsers, session, newToken } = require('../controllers/user.controller')

class UserRouter {
  routesFromUser () {
    const userRoutes = Router()
    userRoutes.post('/createOneUser', createOneUser)
    userRoutes.get('/listAllUsers', listAllUsers)
    userRoutes.post('/session', session)
    userRoutes.post('/newToken', newToken)

    return userRoutes
  }
}

module.exports = new UserRouter()