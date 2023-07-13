const { INTEGER } = require('sequelize')
const { connection } = require('../database/connection')

const PermissionRole = connection.define('permissionsRole', {
  roleId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: "roles",
      key: "id"
    }
  },
  permissionId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: "permissions",
      key: "id"
    }
  }
}, { underscored: true })

module.exports = { PermissionRole }