const { User } = require('../models/user')
const { sign, verify } = require('jsonwebtoken')
const { generateAccessToken, generateRefreshToken } = require('../utils/functions')
class UserController {
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
      return response.status(400).send({ message: error.message })
    }
  }

  async listAllUsers(_, response) {
    try {
      const users = await User.findAll()

      return response.status(200).send(users)
    } catch (error) {
      return response.status(400).send({ message: error.message })
    }
  }

  async session(request, response) {
    try {
      const { email, password } = request.body

      if (!email) {
        throw new Error("Email ou Senha inválidos")
      }
      const existUser = await User.findOne({
        where: { email: email }
      })

      if (!existUser) {
        throw new Error("Email ou Senha inválidos")
      }

      if (existUser.password !== password) {
        throw new Error("Email ou Senha inválidos")
      }

      const accessToken = generateAccessToken({ email: existUser.email, name: existUser.name, id: existUser.id })
      const refreshToken = generateRefreshToken({ email: existUser.email, name: existUser.name, id: existUser.id })


      return response.status(200).send({ message: "Logou", accessToken, refreshToken })
    } catch (error) {
      return response.status(401).send({ message: error.message })
    }
  }

  async newToken(request, response) {
    try {
      const { refreshToken } = request.body

      if(!refreshToken) {
        throw new Error("Proíbido")
      }

      const { id } = verify(refreshToken, process.env.JWT_REFRESH_TOKEN)

      const user = await User.findByPk(id)

      const accessToken = generateAccessToken({name: user.name, id: user.id, email: user.email})
      return response.status(200).send({message: "Token", accessToken})
    } catch (error) {
      return response.status(403).send({message: error.message})
    }
  }
}

module.exports = new UserController()