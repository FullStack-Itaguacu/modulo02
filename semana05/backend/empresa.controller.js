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
    //Desestruturação para pegar as propriedades cnpj, nomeFantasia,dataDeCriacao de dentro do objeto requisicao.body
    const { cnpj, nomeFantasia, dataDeCriacao } = requisicao.body

    //Condicional para verificar se não tem cnpj, nomeFantasia, dataDeCriacao
    if(!cnpj || !nomeFantasia || !dataDeCriacao) {
      return resposta.status(400).send({mensagem: "Todos os campos são obrigatórios"})
    }

    //Condicional para verificar se a tipagem corresponde com a do exercício, caso não, deve executar
    if(
      typeof cnpj !== 'string' || 
      typeof nomeFantasia !== 'string' || 
      typeof dataDeCriacao !== 'string') {
        return resposta.status(400).send(
          {mensagem: "Todos os campos devem estar na tipagem correta"}
          )
    }

    //Chama a função pegarDados, que se existir, retorna o JSON, se não retorna null
    const empresas = pegarDados("empresa.json")

    //A condicional verificar se não tem empresas
    if(!empresas) {

      /*
        A função criarOuAtualizar, serve para criar um arquivo com o nome enviado
        e salvar seus dados bem como sobrescrever o respectivo arquivo caso já exista.
        Campos enviados são nomeDoArquivo e dados
        */
      criarOuAtualizar("empresa.json", [
        { cnpj, nomeFantasia, dataDeCriacao }
      ])
      
      return resposta.status(200).send({
        mensagem: "Criou uma empresa!", 
        dados: pegarDados("empresa.json")
      })
    }

    /* Criação de variável acumulativa para unificar os dados já existentes
      com novos dados enviados pela requisição.
      Utilizando o spread operator para tirar os objetos de dentro do array original
      e o adicionando no novo array e logo após adicionado o novo objeto enviado.
    */
    const totalDeEmpresas = [...empresas, {        
      cnpj, nomeFantasia, dataDeCriacao
    }]

    criarOuAtualizar("empresa.json", totalDeEmpresas)
    return resposta.status(200).send({mensagem: "Criou e atualizou as empresas"})
  }
}