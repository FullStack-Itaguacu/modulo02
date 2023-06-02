const express = require('express')
const app = express()
const rotasDaEmpresa = require('./empresa.route')
const rotasDoUsuario = require('./usuario.route')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(rotasDaEmpresa)
app.use(rotasDoUsuario)

app.listen(3333, () => 
  console.log("Servidor rodando na porta 3333, http://localhost:3333")
) 
