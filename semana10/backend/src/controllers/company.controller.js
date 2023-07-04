const { Company } = require('../models/company')

class CompanyController {
  async createOneCompany(request, response) {
   try {
    const {
      cnpj,
      companyName,
      contact,
      cep,
      address,
      neighborhood,
      city,
      state,
      number,
      complement,
      rhAnalystName,
      supervisorName
    } = request.body;

    const data = await Company.create({
      cnpj,
      companyName,
      contact,
      cep,
      address,
      neighborhood,
      city,
      state,
      number,
      complement,
      rhAnalystName,
      supervisorName
    })

    return response.status(201).send(data)
   } catch (error) {
    console.error(error.message)
    return response.status(400).send(
      {
        message: "Não foi possível criar um registro de empresa!", 
        cause: error.message
      })
   }
  }

  async listCompanies (request, response) {
    const data = await Company.findAll()

    return response.status(200).send(data)
  }

  async listOneCompany (request, response) {
    const { id } = request.params
    const data = await Company.findOne(
      {
        where: {id},
        attributes: ["cnpj"]
      }
    )

    return response.status(200).send(data)
  }
}

module.exports = new CompanyController()