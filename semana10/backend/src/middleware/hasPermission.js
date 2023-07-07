const { Permission } = require("../models/permission")
const { PermissionRole } = require("../models/permissionRole")

function hasPermission(permissions){
    return async (request, response, next) => {
        try {
            const roles = await PermissionRole.findAll({
                where: {
                    roleId: request.payload.roles.map((role)=>role.id)
                },
                attributes: ['permissionId'],
                include: [{ model: Permission, as: 'permissions'}]
            })

            //console.log(roles[0].permissions)

            //  some => Se pelo menos 1 for True, retorna True
            const existPermission = roles.some((item) => {
                const hasPermission = item.permissions.some((p) => {
                    return permissions.includes(p.description)
                })
                return hasPermission
            })
    
            if(!existPermission){
                return response.status(401).send({message: "Você não tem autorização para este recurso."})
            }

            next()
        } catch (error) {
            return response.status(401).send({
                message: "Autenticação Falhou",
                cause: error.message})
        }
    }
}

module.exports = { hasPermission }
