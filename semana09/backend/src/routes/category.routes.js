const { createOneCategory, listCategories, listOneCategory, updateOneCategory, deleteOneCategory } = require('../controllers/category.controller');
const { Router } = require('express')

class CategoryRouter {
  routesFromCategory () {
    const categoryRoutes = Router()
    categoryRoutes.post('/createOneCategory', createOneCategory)
    categoryRoutes.get('/listCategories/:offset/:limit', listCategories)
    categoryRoutes.get('/listOneCategory/:id', listOneCategory)
    categoryRoutes.patch('/updateOneCategory/:id', updateOneCategory)
    categoryRoutes.delete('/deleteOneCategory/:id', deleteOneCategory)

    return categoryRoutes
  }
}

module.exports = new CategoryRouter()