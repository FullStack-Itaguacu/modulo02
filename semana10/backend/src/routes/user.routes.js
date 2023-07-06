const { createOneUser, loginUser } = require('../controllers/user.controller')
const { Router } = require('express')

class UserRouter{
    routesFromUser () {
        const userRoutes = Router()
        userRoutes.post('/createOneUser', createOneUser)
        userRoutes.post('/loginUser', loginUser)
        return userRoutes
    }
}

module.exports = new UserRouter()