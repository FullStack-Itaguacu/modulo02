const { Category } = require('../models/category')

class CategoryController {
  async createOneCategory (request, response) {
    const { name } = request.body

    const data = await Category.create({
      name
    })

    return response.status(201).send(data)
  }

  async listOneCategory (request, response) {
    const data = await Category.findAll({
      where: { name: "Vendas"}
    })

    return response.status(200).send(data)
  }
}

module.exports = new CategoryController()