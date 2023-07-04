const { Category } = require('../models/category');
const { Company } = require('../models/company');
const { Contract } = require('../models/contract');
const { Trainee } = require('../models/trainee');

class ContractController {
  async createOneContract(request, response) {
    try {
      const {
        traineeId,
        categoryId,
        companyId,
        startValidity,
        endValidity,
        status,
        remuneration,
        extra
      } = request.body;

      const data = await Contract.create({
        traineeId,
        categoryId,
        companyId,
        startValidity,
        endValidity,
        status,
        remuneration,
        extra
      })

      return response.status(201).send(data)
    } catch (error) {
      console.error(error.message)
      return response.status(400).send(
        {
          message: "Não foi possível criar um registro de contrato",
          cause: error.message
        })
    }
  }

  async listContracts(request, response) {
    const data = await Contract.findAll(
      {
        include: [
          {
            model: Trainee,
            attributes: ['name', 'primaryPhoneContact']
          },
          {
            model: Company,
            attributes: ['companyName', 'supervisorName']
          },
          {
            model: Category,
            attributes: ['name']
          }
        ],
        order: [
          ["id", "ASC"]
        ]
      }
    )

    const result = data.map((item) => {
      const rest = JSON.parse(JSON.stringify(item))
      return {
        ...rest,
        traineeName: item.trainee.name,
        primaryPhoneContact: item.trainee.primaryPhoneContact,
        companyName: item.company.companyName,
        supervisorName: item.company.supervisorName,
        categoryName: item.category.name
      }
    })

    const total = await Contract.count()

    return response.status(200).send({ records: result, total })
  }

  async listOneContract (request, response) {
    const { id } = request.params
    const data = await Contract.findOne(
      {
        where: {id},
        attributes: ["cnpj"]
      }
    )

    return response.status(200).send(data)
  }
}

module.exports = new ContractController()