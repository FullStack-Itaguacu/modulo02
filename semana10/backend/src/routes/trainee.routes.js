const { createOneTrainee, listTrainees, listOneTrainee, updateOneTrainee } = require('../controllers/trainee.controller');
const { Router } = require('express')

class TraineeRouter {
  routesFromTrainee () {
    const traineeRoutes = Router()
    traineeRoutes.post('/createOneTrainee', createOneTrainee)
    traineeRoutes.get('/listTrainees', listTrainees)
    traineeRoutes.get('/listOneTrainee/:id', listOneTrainee)
    traineeRoutes.patch('/updateOneTrainee/:id', updateOneTrainee)

    return traineeRoutes
  }
}

module.exports = new TraineeRouter()