const { Router } = require('express')
const rotas = Router()
const userRoutesV1 = require('./v1/user')

rotas.use([userRoutesV1])

module.exports = rotas