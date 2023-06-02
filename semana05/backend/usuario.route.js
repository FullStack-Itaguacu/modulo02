const { Router } = require('express')
/*
 O Router serve para disponibilizar rotas 
 pelo servidor para serem acessíveis por 
 outras APIs/Frontend
*/
const rotasDoUsuario = Router()
const controller = require('./usuario.controller')
rotasDoUsuario.post('/criarUsuario', controller.criarUsuario)
rotasDoUsuario.get('/listarTodosOsUsuarios', controller.listarUsuario)

module.exports = rotasDoUsuario