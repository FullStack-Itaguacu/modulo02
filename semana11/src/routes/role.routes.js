const { createOneRole, listRoles, createOneRoleAndAssociatePermissions } = require('../controllers/role.controller')
const { Router } = require('express')

class RoleRouter {
  routesFromRole () {
    const roleRoutes = Router()
    roleRoutes.get('/listRoles', listRoles)
    roleRoutes.post('/createOneRole', createOneRole)
    roleRoutes.post('/createOneRoleAndAssociatePermissions', createOneRoleAndAssociatePermissions)

    return roleRoutes
  }
}

module.exports = new RoleRouter()

// const userRoutes = Router()
// userRoutes.get('/listUsers', listUsers)
// userRoutes.post('/createOneUser', createOneUser)

// module.exports = {
//   userRoutes
// }