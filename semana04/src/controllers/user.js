const { criarOuAtualizar, pegarDados } = require('../utils')

module.exports = {
  async listaDeUsuarios(requisicao, resposta) {
    try {
      const { nomeDoArquivo } = requisicao.params
      const usuariosDaBase = pegarDados(nomeDoArquivo)

      return resposta.status(200).send({usuarios: usuariosDaBase})
    } catch (error) {
      return resposta.status(400).send({
        mensagem: "Não foi enviado o nome do arquivo",
        causa: error.message
      })
    }

  },
  async criarBaseDeDadosDeUsuario(requisicao, resposta) {
    try {
      const { nomeDoArquivo, dados } = requisicao.body

      criarOuAtualizar(nomeDoArquivo, dados)
    
      return resposta.status(201).send(
        {
          mensagem: "Criação e/ou atualização de arquivo concluída"
        }
      )
    } catch (error) {
      return resposta.status(400).send({
        mensagem: "Falha ao criar o arquivo", 
        causa: error.message
      })
    }
  }
}