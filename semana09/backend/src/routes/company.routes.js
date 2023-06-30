const { createOneCompany, listCompanies, listOneCompany } = require('../controllers/company.controller');
const { Router } = require('express')

class CompanyRouter {
  routesFromCompany () {
    const companyRoutes = Router()
    companyRoutes.post('/createOneCompany', createOneCompany)
    companyRoutes.get('/listCompanies', listCompanies)
    companyRoutes.get('/listOneCompany/:id', listOneCompany)

    return companyRoutes
  }
}

module.exports = new CompanyRouter()