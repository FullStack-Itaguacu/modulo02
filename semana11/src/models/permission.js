const { STRING } = require('sequelize')
const { connection } = require('../database/connection')
const { Role } = require('./role')
const { PermissionRole } = require('./permissionRole')

const Permission = connection.define('permission', {
  description: STRING
}, { underscored: true })

Permission.belongsToMany(Role, { through: PermissionRole })
Role.belongsToMany(Permission, { through: PermissionRole })

module.exports = { Permission }