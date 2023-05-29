const { criarOuAtualizar, pegarDados } = require('./utils')

module.exports = {
  async verificarEmpresa(requisicao, resposta, proximo) {
    console.log(requisicao.body.cnpj)
    if(!requisicao.body.cnpj){
      return resposta.status(400).send({erro: "A empresa não é verídica!"})
    }
    console.log("Essa empresa é véridica!")
    proximo()
  },
  
  async criarEmpresa(requisicao, resposta) {
    const { cnpj, nomeFantasia, dataDeCriacao } = requisicao.body

    if(!cnpj || !nomeFantasia || !dataDeCriacao) {
      return resposta.status(400).send({mensagem: "Todos os campos são obrigatórios"})
    }

    if(
      typeof cnpj !== 'string' || 
      typeof nomeFantasia !== 'string' || 
      typeof dataDeCriacao !== 'string') {
        return resposta.status(400).send(
          {mensagem: "Todos os campos devem estar na tipagem correta"}
          )
    }

    const empresas = pegarDados("empresa.json")

    if(!empresas) {
      criarOuAtualizar("empresa.json", [
        { cnpj, nomeFantasia, dataDeCriacao }
      ])
      
      return resposta.status(200).send({
        mensagem: "Criou uma empresa!", 
        dados: pegarDados("empresa.json")
      })
    }

    const totalDeEmpresas = [...empresas, {        
      cnpj, nomeFantasia, dataDeCriacao
    }]

    criarOuAtualizar("empresa.json", totalDeEmpresas)
    return resposta.status(200).send({mensagem: "Criou e atualizou as empresas"})
  }
}