const { listPermissions, createOnePermission, listRoles, createOneRole, listPermissionsByRole, addRoleToUser, addPermissionToRole } = require('../controllers/rbac.controller');
const { Router } = require('express')

class RBACRouter {
    routesFromRBAC() {
        const rbacRoutes = Router()
        rbacRoutes.post('/createOnePermission', createOnePermission)
        rbacRoutes.post('/createOneRole', createOneRole)
        rbacRoutes.get('/listPermissions', listPermissions)
        rbacRoutes.get('/listRoles', listRoles)
        rbacRoutes.get('/listPermissionsByRole/:id', listPermissionsByRole)
        rbacRoutes.post('/addRoleToUser', addRoleToUser)
        rbacRoutes.post('/addPermissionToRole', addPermissionToRole)
        
        return rbacRoutes
    }
}

module.exports = new RBACRouter()