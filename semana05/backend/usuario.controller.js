const { validaEmail, pegarDados, criarOuAtualizar } = require('./utils')

module.exports = {
  async criarUsuario(requisicao, resposta) {
    const { nome, idade, email } = requisicao.body

    if(!nome || !idade || !email) {
      return resposta.status(400).send({mensagem: "Falta campos obrigatórios"})
    }

    if(!validaEmail(email)) {
      return resposta.status(400).send({mensagem: "O email enviado não está padronizado"})
    }

    const usuarios = pegarDados('usuario.json')
    const novoUsuario = {
      id: new Date().getTime(),
      idade,
      nome,
      email
    }
    console.log(novoUsuario)

    if(usuarios === null) {
      criarOuAtualizar('usuario.json', [novoUsuario])
    }

    const todosOsUsuarios = [...usuarios, novoUsuario]
    criarOuAtualizar('usuario.json', todosOsUsuarios)

    return resposta.status(200).send({mensagem: "Criou usuário"})
  },

  async listarUsuario(requisicao, resposta) {
    const usuarios = pegarDados('usuario.json')

    if(!usuarios) {
      return resposta.status(204).send()
    }

    return resposta.status(200).send({usuarios})
  }
}