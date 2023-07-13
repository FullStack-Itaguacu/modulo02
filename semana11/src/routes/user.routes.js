const { listUsers, createOneUser, loginUser } = require('../controllers/user.controller')
const { Router } = require('express')

class UserRouter {
  routesFromUser () {
    const userRoutes = Router()
    userRoutes.get('/listUsers', listUsers)
    userRoutes.post('/createOneUser', createOneUser)
    userRoutes.post('/loginUser', loginUser)

    return userRoutes
  }
}

module.exports = new UserRouter()

// const userRoutes = Router()
// userRoutes.get('/listUsers', listUsers)
// userRoutes.post('/createOneUser', createOneUser)

// module.exports = {
//   userRoutes
// }