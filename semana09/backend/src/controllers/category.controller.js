const { Category } = require('../models/category')

class CategoryController {
  async createOneCategory (request, response) {
    const { name } = request.body

    const data = await Category.create({
      name
    })

    return response.status(201).send(data)
  }

  async listCategories (request, response) {
    const {offset, limit} = request.params

    const data = await Category.findAll(
      {
        offset: offset * limit,
        limit: limit,
        order: [
          ["id", "ASC"]
        ]
      }
    )

    const total = await Category.count()

    return response.status(200).send({records: data, total})
  }

  async listOneCategory (request, response) {
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