const { createOneTrainee, listTrainees, listOneTrainee } = require('../controllers/trainee.controller');
const { Router } = require('express')

class TraineeRouter {
  routesFromTrainee () {
    const traineeRoutes = Router()
    traineeRoutes.post('/createOneTrainee', createOneTrainee)
    traineeRoutes.get('/listTrainees', listTrainees)
    traineeRoutes.get('/listOneTrainee/:id', listOneTrainee)

    return traineeRoutes
  }
}

module.exports = new TraineeRouter()