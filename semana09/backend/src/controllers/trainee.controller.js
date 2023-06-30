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
      return response.status(400).send(
        {
          message: "Não foi possível criar um registro de estagiário",
          cause: error.message
        })
    }
  }

  async listTrainees(request, response) {
    const data = await Trainee.findAll()

    return response.status(200).send(data)
  }

  async listOneTrainee(request, response) {
    const { id } = request.params
    const data = await Trainee.findByPk(id)

    return response.status(200).send(data)
  }

  async updateOneTrainee(request, response) {
    const { id } = request.params
    const {
      email,
      haveSpecialNeeds,
      primaryPhoneContact,
      secondaryPhoneContact
    } = request.body
    const dataForUpdate = Object.assign({},
      email && { email },
      primaryPhoneContact && { primaryPhoneContact },
      secondaryPhoneContact && { secondaryPhoneContact },
      typeof haveSpecialNeeds === 'boolean' && { haveSpecialNeeds }
    )

    await Trainee.update(
      dataForUpdate,
      { where: { id }}
    )

    return response.status(204).send()
  }
}

module.exports = new TraineeController()