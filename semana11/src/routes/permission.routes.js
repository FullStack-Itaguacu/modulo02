const { createOnePermission, listPermissions } = require('../controllers/permission.controller')
const { Router } = require('express')

class PermissionRouter {
  routesFromPermission () {
    const permissionRoutes = Router()
    permissionRoutes.get('/listPermissions', listPermissions)
    permissionRoutes.post('/createOnePermission', createOnePermission)

    return permissionRoutes
  }
}

module.exports = new PermissionRouter()

// const userRoutes = Router()
// userRoutes.get('/listUsers', listUsers)
// userRoutes.post('/createOneUser', createOneUser)

// module.exports = {
//   userRoutes
// }