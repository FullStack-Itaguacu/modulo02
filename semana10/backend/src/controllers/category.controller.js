const { Category } = require('../models/category')
const { listCategoriesService } = require('../services/category.services')
const { verify } = require('jsonwebtoken')
const { config } = require('dotenv')
config()

class CategoryController {
  async createOneCategory (request, response) {
    try {
      const { name } = request.body
      if(!name) {
        return response.status(400).send({message: "O nome é um campo obrigatório"})
      }

      const data = await Category.create({
        name
      })
  
      return response.status(201).send(data)
    } catch (error) {
      console.log(error.message)
      return response.status(400).send({message: "A categoria não pôde ser criada!"})
    }
  }

  async listCategories (request, response) {

    const {offset, limit} = request.params

    const data = await listCategoriesService(offset, limit)

    const total = await Category.count()

    return response.status(200).send({records: data, total})
  }

  async listOneCategory (request, response) {
      console.log("Entramos no ListOneCategory")
      const { id } = request.params
      const data = await Category.findByPk(id)

      return response.status(200).send(data)
  }

  async updateOneCategory (request, response) {
    const { id } = request.params
    const { name } = request.body
    
    await Category.update(
      { name },
      { where: { id }}
    )

    return response.status(204).send()
  }

  async deleteOneCategory (request, response) {
    const { id } = request.params
    await Category.destroy(
      {
        where: { id },
        //force: true // serve para deletar do banco de dados ao utilizar o modelo paranoid
      }
    )

    return response.status(204).send()
  }
}

module.exports = new CategoryController()