const express = require('express') //Framework da aplicação
const cors = require('cors') // Biblioteca utilizada para inserir headers http
const { connection } = require('./database/connection') // Configuração de acesso ao banco de dados
const routes = require('./routes')

class Server {
  constructor (server = express())// Argumento do constructor auto iniciado da aplicação para usarmos as devidas funções do express
  { 
    this.middlewares(server) // Instância do argumento da função para a função middlewares
    this.database()  // Instância da função database
    this.allRoutes(server)
    this.initializeServer(server) // Instância da função initializeServer
  }

  async middlewares(app) {
    app.use(cors()) // Utilização da função cors dentro do servidor
    app.use(express.json()) // Habilitar entrada de dados como json no servidor
  }

  async database() {
    try {
      await connection.authenticate(); // Tentativa de conexão com o banco de dados
      console.log('Conexão bem sucedida!');
    } catch (error) {
      console.error('Não foi possível conectar no banco de dados.', error);
      throw error
    }
  }
  async initializeServer(app) {
    const PORT = 5000 // Valor da porta do servidor
    app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`)) // Execução do servidor
  }

  async allRoutes(app) {
    app.use(routes)
  }
}

module.exports = { Server } // Exportação da Classe Server