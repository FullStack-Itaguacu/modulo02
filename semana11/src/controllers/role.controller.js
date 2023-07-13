const { Permission } = require('../models/permission')
const { Role } = require('../models/role')
const { listPermissionService, getPermissionsById } = require('../services/permission.service')

class RoleController {
  async listRoles(request, response) {

    const roles = await Role.findAll(
      {
        include: {
          model: Permission,
          attributes: ["description"]
        }
      }
    )
    return response.status(200).send(
      {
        "records": roles
      })
  }

  async createOneRole(request, response) {
    try {
      const { description, permissions } = request.body
      const newRole = await Role.create({ //Todos os valores devem ser criados, e não utilizar valores de associação.
        description,
        permissions
      },
      {
        include: Permission
      }
      )

      return response.status(201).send(newRole)
    } catch (error) {
      return response.status(409).send({
        "message": "Não foi possível criar um cargo e demais novas permissões",
        "cause": error.message
      })
    }
  } 

  async createOneRoleAndAssociatePermissions(request, response) {
    try {
      const { description, permissions } = request.body
      const newRole = await Role.create({
        description
      })

      const permissionsResult = await getPermissionsById(permissions)

      await newRole.addPermissions(permissionsResult)
      return response.status(201).send(newRole)
    } catch (error) {
      return response.status(409).send({
        "message": "Não foi possível criar um cargo e demais novas permissões",
        "cause": error.message
      })
    }
  } 
}

module.exports = new RoleController()