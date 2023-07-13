const express = require('express')
const app = express()
const routes = require('./routes')
const { connection } = require('./database/connection')

app.use(express.json())
app.use(routes)
connection.authenticate()

app.listen(3333, () => console.log("Executando o servidor na porta 3333"))