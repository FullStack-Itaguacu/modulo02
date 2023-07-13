const { User } = require('../models/user')
const { sign } = require('jsonwebtoken')
class UserController {
  async listUsers(request, response) {

    const users = await User.findAll()
    return response.status(200).send(
      {
        "records": users
      })
  }

  async createOneUser(request, response) {
    try {
      const { name, email, password } = request.body

      const newUser = await User.create({
        name,
        email,
        password
      })

      return response.status(201).send(newUser)
    } catch (error) {
      return response.status(409).send({
        "message": "Não foi possível criar um usuário",
        "cause": error.message
      })
    }
  }

  async loginUser(request, response) {
    try {
      const { email, password } = request.body

      const existUser = await User.findOne({
        where: {
          email
        }
      })
      
      if(!existUser || existUser.password !== password) {
        throw new Error("Não foi possível realizar o login.")
      }
      const payload = {
        id: existUser.id,
        email: existUser.email, 
        name: existUser.name, 
      }

      const token = sign(payload, process.env.SECRET, {
        expiresIn: '1d'
      })

      return response.status(200).send({token})
    } catch (error) {
      return response.status(401).send({message: error.message})
    }
  }
}

module.exports = new UserController()