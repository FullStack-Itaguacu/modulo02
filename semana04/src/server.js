const express = require('express')
const rotas = require('./routes')
const app = express()

const PORT = 3333

app.use(express.json())
app.use(rotas)

app.listen(PORT, () => console.log(`Servidor ligado na porta ${PORT}`))