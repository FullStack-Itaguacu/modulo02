const { Permission } = require('../models/permission')
const { listPermissionService } = require('../services/permission.service')

class PermissionController {
  async listPermissions(request, response) {
    const permissions = await listPermissionService()
    return response.status(200).send(
      {
        "records": permissions
      })
  }

  async createOnePermission(request, response) {
    try {
      const { description } = request.body

      const newPermission = await Permission.create({
        description
      })

      return response.status(201).send(newPermission)
    } catch (error) {
      return response.status(409).send({
        "message": "Não foi possível criar uma permissão",
        "cause": error.message
      })
    }
  }
}

module.exports = new PermissionController()