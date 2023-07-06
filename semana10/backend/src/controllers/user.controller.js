const { User  } = require('../models/user')
const { sign } = require('jsonwebtoken')
const { config } = require('dotenv')
config()

class UserController{
    async createOneUser(request, response){

        try {
            const {
                traineeId,
                name,
                email,
                password
            } = request.body;
    
             const data = await User.create({
                traineeId,
                name,
                email,
                password
            })
    
            return response.status(201).send(data)
        } catch (error) {
            return response.status(400).send(
                {
                    message: "Falha na operação de criar usuário",
                    cause: error.message
                }
            )
        }

        
    }

    async loginUser(request, response) {
        try {            
            const {
                email,
                password
            } = request.body;
    
            console.log(request.body)
            
            const user = await User.findOne({
                where:{email:email}
            })

            console.log(user)
    
            if (user.password === password){
                const payload = {"email": user.email}

                const token = sign(payload, process.env.SECRET_JWT)
                return response.status(200).send({token}) 
            }
            else {
                console.log("Senha Diferente")
                return response.status(400).send({"msg": "Senha Invalida"})
            }
        } catch (error) {
            return response.status(401).send({
                    message: "Tentativa de Login Falhou",
                    cause: error.message})
        }
    }
}

module.exports = new UserController()