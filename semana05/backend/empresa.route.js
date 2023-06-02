const { Router } = require('express')
/*
 O Router serve para disponibilizar rotas 
 pelo servidor para serem acessíveis por 
 outras APIs/Frontend
*/
const rotasDaEmpresa = Router()
const multer = require('multer')
const upload = multer()
const { criarEmpresa, listarEmpresa, atualizarEmpresa, excluirEmpresa, salvarImagem } = require('./empresa.controller')

rotasDaEmpresa.post('/criarEmpresa', criarEmpresa)
rotasDaEmpresa.get('/listarEmpresasSalvas', listarEmpresa)
rotasDaEmpresa.patch('/atualizarEmpresa/:cnpj', atualizarEmpresa)
rotasDaEmpresa.delete('/excluirEmpresa/:cnpj', excluirEmpresa)
rotasDaEmpresa.post('/salvarImagem', upload.single("file"), salvarImagem)

module.exports = rotasDaEmpresa



