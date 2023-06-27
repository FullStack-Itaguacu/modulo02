const { createOneCategory, listCategories } = require('../controllers/category.controller');
const { Router } = require('express')

class CategoryRouter {
  routesFromCategory () {
    const categoryRoutes = Router()
    categoryRoutes.post('/createOneCategory', createOneCategory)
    categoryRoutes.get('/listCategories', listCategories)

    return categoryRoutes
  }
}

module.exports = new CategoryRouter()