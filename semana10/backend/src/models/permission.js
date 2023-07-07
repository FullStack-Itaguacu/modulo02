const { connection } = require('../database/connection');
const { STRING, DATE } = require('sequelize')
const { PermissionRole } = require('./permissionRole')
const { Role } = require('./role')

const Permission = connection.define("permission", {
    description: {
        type:STRING,
        validate:{
            len:{args:[1,100]}
        },
        unique: {msg: "Permissão já existente"}
    },
    createdAt:DATE, //Sequelize traduz para SnakeCase
    updatedAt:DATE
},
{ underscored: true, paranoid: true })

Permission.belongsToMany(Role, { through: PermissionRole });
Role.belongsToMany(Permission, { through: PermissionRole });
PermissionRole.hasMany(Permission, {foreignKey: 'id'})
//Permission.belongsToMany(Role, { through: PermissionRole, foreignKey: 'permissionId', as: 'roles'});
//Role.belongsToMany(Permission, { through: PermissionRole, foreignKey: 'roleId', as: 'permissions'});

/*
Permission.hasMany( PermissionRole, 
    {as: "roles_reference", foreignKey: "permission_id"}
)
*/
module.exports = { Permission }