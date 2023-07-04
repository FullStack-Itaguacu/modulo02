const { Category } = require('../models/category')

class CategoryServices {
  async listCategoriesService(offset, limit) {
    const list = await Category.findAll({
      limit,
      offset
    })

    return list
  }
}

module.exports = new CategoryServices()