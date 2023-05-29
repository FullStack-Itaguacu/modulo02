const { Router } = require('express')
/*
 O Router serve para disponibilizar rotas 
 pelo servidor para serem acessíveis por 
 outras APIs/Frontend
*/
const rotasDaEmpresa = Router()
const { criarEmpresa, verificarEmpresa } = require('./empresa.controller')

rotasDaEmpresa.post('/criarEmpresa', verificarEmpresa, criarEmpresa)

module.exports = rotasDaEmpresa



