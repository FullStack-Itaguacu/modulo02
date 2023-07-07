const { createOneCategory, listCategories, listOneCategory, updateOneCategory, deleteOneCategory } = require('../controllers/category.controller');
const { Router } = require('express')
const { auth } = require('../middleware/auth')
//const { loggin } = require('../middleware/loggin');
const { hasPermission } = require('../middleware/hasPermission');

class CategoryRouter {
  routesFromCategory () {
    const categoryRoutes = Router()
    categoryRoutes.post('/createOneCategory', createOneCategory)
    categoryRoutes.get('/listCategories/:offset/:limit', listCategories)
    categoryRoutes.get('/listOneCategory/:id', auth, hasPermission(['sListarCategorias','Falso']), listOneCategory)
    categoryRoutes.patch('/updateOneCategory/:id', updateOneCategory)
    categoryRoutes.delete('/deleteOneCategory/:id', deleteOneCategory)

    return categoryRoutes
  }
}

module.exports = new CategoryRouter()