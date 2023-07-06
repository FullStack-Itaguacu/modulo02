const { createOneCategory, listCategories, listOneCategory, updateOneCategory, deleteOneCategory } = require('../controllers/category.controller');
const { Router } = require('express')
const { auth } = require('../middleware/auth')
const { loggin } = require('../middleware/loggin')

class CategoryRouter {
  routesFromCategory () {
    const categoryRoutes = Router()
    categoryRoutes.post('/createOneCategory', auth, createOneCategory)
    categoryRoutes.get('/listCategories/:offset/:limit', auth, listCategories)
    categoryRoutes.get('/listOneCategory/:id', auth, listOneCategory)
    categoryRoutes.patch('/updateOneCategory/:id', auth, updateOneCategory)
    categoryRoutes.delete('/deleteOneCategory/:id', auth, deleteOneCategory)

    return categoryRoutes
  }
}

module.exports = new CategoryRouter()