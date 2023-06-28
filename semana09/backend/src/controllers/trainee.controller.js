const { Trainee } = require('../models/trainee')

class TraineeController {
  async createOneTrainee(request, response) {
   try {
    const {
      name,
      email,
      rg,
      cpf,
      primaryPhoneContact,
      secondaryPhoneContact,
      dateBirth,
      fatherName,
      motherName,
      haveSpecialNeeds
    } = request.body;

    const data = await Trainee.create({
      name,
      email,
      rg,
      cpf,
      primaryPhoneContact,
      secondaryPhoneContact,
      dateBirth,
      fatherName,
      motherName,
      haveSpecialNeeds
    })

    return response.status(201).send(data)
   } catch (error) {
    console.error(error.message)
    return response.status(400).send({message: "Não foi possível criar um registro de estagiário", cause: error.message})
   }
  }
}

module.exports = new TraineeController()