const { Router } = require('express')
/*
 O Router serve para disponibilizar rotas 
 pelo servidor para serem acessíveis por 
 outras APIs/Frontend
*/
const rotasDaEmpresa = Router()
const { criarEmpresa } = require('./empresa.controller')

rotasDaEmpresa.post('/criarEmpresa', criarEmpresa)
rotasDaEmpresa.get('/listarEmpresasSalvas', controller.listarEmpresa)

module.exports = rotasDaEmpresa



