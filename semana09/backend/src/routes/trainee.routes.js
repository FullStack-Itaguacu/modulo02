const { createOneTrainee } = require('../controllers/trainee.controller');
const { Router } = require('express')

class TraineeRouter {
  routesFromTrainee () {
    const traineeRoutes = Router()
    traineeRoutes.post('/createOneTrainee', createOneTrainee)

    return traineeRoutes
  }
}

module.exports = new TraineeRouter()