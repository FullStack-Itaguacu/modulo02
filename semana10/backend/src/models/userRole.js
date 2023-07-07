const { connection } = require('../database/connection');
const { INTEGER, DATE } = require('sequelize');

const UserRole = connection.define("usersRole", {
    roleId: {
        type: INTEGER,
        references: {
            model: {
                tableName: 'roles'
            },
            key: 'id'
        },
        allowNull: false
    },
    userId: {
        type: INTEGER,
        references: {
            model: {
                tableName: 'users'
            },
            key: 'id'
        },
        allowNull: false
    },
    createdAt:DATE,
    updatedAt:DATE
},{ underscored: true, paranoid: true })

module.exports = { UserRole }