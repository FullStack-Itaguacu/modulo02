const express = require('express')
const app = express()
const rotasDaEmpresa = require('./empresa.route')

app.use(express.json())
app.use(rotasDaEmpresa)


app.listen(3333, () => 
  console.log("Servidor rodando na porta 3333, http://localhost:3333")
) 
