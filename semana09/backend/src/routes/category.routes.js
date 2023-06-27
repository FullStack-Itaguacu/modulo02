const { createOneCategory, listOneCategory } = require('../controllers/category.controller');
const { Router } = require('express')

class CategoryRouter {
  routesFromCategory () {
    const categoryRoutes = Router()
    categoryRoutes.post('/createOneCategory', createOneCategory)
    categoryRoutes.get('/listOneCategory', listOneCategory)

    return categoryRoutes
  }
}

module.exports = new CategoryRouter()