const { connection } = require('../database/connection');
const { STRING, DATE } = require('sequelize')
const { User } = require('../models/user')
// const { Permission } = require('./permission')
// const { PermissionRole } = require('./permissionRole')
const { UserRole } = require('./userRole')

const Role = connection.define("role", {
    description: {
        type:STRING,
        validate:{
            len:{args:[1,100]}
        },
        unique: {msg: "Permissão já existente"}
    },
    createdAt:DATE, //Sequelize traduz para SnakeCase
    updatedAt:DATE
})

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

/*
Role.belongsToMany(Permission, {
    through: 'permission_roles', // Nome da tabela intermediária
    foreignKey: 'role_id', // Nome da coluna na tabela intermediária que faz referência à tabela "roles"
    otherKey: 'permission_id', // Nome da coluna na tabela intermediária que faz referência à tabela "permissions"
  })
*/
module.exports = { Role }
