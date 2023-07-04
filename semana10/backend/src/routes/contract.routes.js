const { createOneContract, listContracts, listOneContract } = require('../controllers/contract.controller');
const { Router } = require('express')

class ContractRouter {
  routesFromContract () {
    const contractRoutes = Router()
    contractRoutes.post('/createOneContract', createOneContract)
    contractRoutes.get('/listContracts', listContracts)
    contractRoutes.get('/listOneContract/:id', listOneContract)

    return contractRoutes
  }
}

module.exports = new ContractRouter()