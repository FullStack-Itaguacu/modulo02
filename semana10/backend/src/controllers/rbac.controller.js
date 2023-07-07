const { Permission } = require('../models/permission')
const { Role } = require('../models/role')
const { User } = require('../models/user')

class RBAC {
    async listPermissions(request, response) {
        const data = await Permission.findAll()
        const total = await Permission.count()

        return response.status(200).send({ records: data, total })
    }

    async createOnePermission(request, response) {
        try {
            const { description } = request.body
            if (!description) {
                return response.status(400).send({ message: "A descrição é um campo obrigatório" })
            }

            const permission = await Permission.findOne({where: {description:description}})
            if(permission){
             return response.status(400).send({ message: "Permissão já criada" })
            }

            const data = await Permission.create({
                description
            })

            return response.status(201).send(data)
        } catch (error) {
            console.log(error.message)
            return response.status(400).send({ message: "A permissão não pôde ser criada!" })
        }
    }

    async listRoles(request, response) {
        const data = await Role.findAll()
        const total = await Role.count()

        return response.status(200).send({ records: data, total })
    }

    async createOneRole(request, response) {
        try {
            const { description } = request.body
            if (!description) {
                return response.status(400).send({ message: "A descrição é um campo obrigatório" })
            }

            const role = await Role.findOne({where: {description:description}})
               if(role){
                return response.status(400).send({ message: "Função já criada" })
            }

            const data = await Role.create({
                description
            })

            return response.status(201).send({ message: "A Função foi criada!", data})
        } catch (error) {
            console.log(error.message)
            return response.status(400).send({ message: "A Função não pôde ser criada!" })
        }
    }

    async listPermissionsByRole(request, response){
        try {
            const { id } = request.params;
            const role = await Role.findOne({
              where: { id: id },
              include: [{ 
                model: Permission, 
                as: 'permissions', through: { attributes: ['id','description'] } }],
            });

            if (!role){
                return response.status(404).json({ 
                    message: 'Função não encontrada' 
                })
            }; 

            return response.status(200).json(role);
        } catch (error) {
            response.status(500).json({ message: 'Algo deu errado' });
        }
    }

    async addPermissionToRole(request, response) {
        try {
            const { permissionId, roleId } = request.body

            if (!permissionId) {
                return response.status(400).send({ message: "O id da permissão é um campo obrigatório" })
            }

            if (!roleId) {
                return response.status(400).send({ message: "O id da função é um campo obrigatório" })
            }

            const role = await Role.findOne({
                where: {id: roleId}
              })

            if (!role) {
                return response.status(400).send({ message: "A função não existe." })
            }
            
            const permission = await Permission.findOne({
                where: {id: permissionId}
            })

            if (!permission) {
                return response.status(400).send({ message: "A permissão não existe." })
            }

            await role.addPermissions(permission);

            return response.status(201).send({message: "Permissão atribuida a Função com sucesso!"})
        } catch (error) {
            console.log(error.message)
            return response.status(400).send({ message: "A Função não pôde ser atribuida!" })
        }
    }

    async addRoleToUser(request, response) {
        try {
            const { userId, roleId } = request.body

            if (!userId) {
                return response.status(400).send({ message: "O id do usuário é um campo obrigatório" })
            }

            if (!roleId) {
                return response.status(400).send({ message: "O id da função é um campo obrigatório" })
            }

            const role = await Role.findOne({
                where: {id: roleId}
              })

            const user = await User.findOne({
                where: {id: userId}
            })

            await user.addRoles(role);

            return response.status(201).send({message: "Função atribuida ao usuário com sucesso!"})
        } catch (error) {
            console.log(error.message)
            return response.status(400).send({ message: "A Função não pôde ser atribuida!" })
        }
    }
}

module.exports = new RBAC()