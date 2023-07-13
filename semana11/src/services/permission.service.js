const { Permission } = require("../models/permission")
const { Op } = require('sequelize')

class PermissionService {
  async listPermissionService() {
    const permissions = await Permission.findAll()

    return permissions
  }

  async getPermissionsById(ids) {
    const permissions = await Permission.findAll({
      where: {
        id: ids
      }
    })

    return permissions
  }
}

module.exports = new PermissionService()