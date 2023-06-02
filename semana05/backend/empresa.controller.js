const { criarOuAtualizar, pegarDados, codigosDeErros } = require('./utils')
const { writeFileSync } = require('fs')

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
  },

  async listarEmpresa(requisicao, resposta) {
    const { busca } = requisicao.query // Parametro opcional de busca
    const empresas = pegarDados('empresa.json')

    if (!empresas || empresas.length === 0) { // Se empresa não existir ou for null, deve retornar 204
      return resposta.status(204).send()
    }

    // função para validar dados, se houver pelo menos uma propriedade válida, retorna true, se não false
    const existeDadosValidos = Object.keys(empresas[0]).some((propriedade) => {
      return propriedade === 'cnpj' ||
        propriedade === 'nomeFantasia' ||
        propriedade === 'dataDeCriacao'
    })

    // Caso seja falso, retorna 204
    if (!existeDadosValidos) {
      return resposta.status(204).send()
    }

    // Se não tiver a informação da busca, retorna todos os dados das empresas
    if(!busca) {
      return resposta.status(200).send({ mensagem: "Tem dados", dados: empresas })
    }

    // Filtro de empresas
    const empresasFiltradas = empresas.filter(({nomeFantasia}) => 
      nomeFantasia.includes(busca)
    )

    return resposta.status(200).send({ mensagem: "Tem dados", dados: empresasFiltradas })
  },

  async atualizarEmpresa(requisicao, resposta) {
    const { cnpj } = requisicao.params // Pegar o cnpj do params direto da rota
    const { nomeFantasia, dataDeCriacao } = requisicao.body // Pegar o nomeFantasia e dataDeCriacao direto do body, lembrando que neste caso são opcionais
    const empresas = pegarDados('empresa.json')
    
    // Se não houver empresas, lança um erro na requisição
    if(!empresas) {
      return resposta.status(400).send({mensagem: "Não existem dados para serem atualizados!"})
    }

    // Verificar se tem alguma empresa com aquele cnpj enviado, se houver pelo menos um, retorna true, se não false
    const existePeloMenosUmaEmpresaComEsseCNPJ = empresas.some((empresa) => 
      empresa.cnpj === cnpj
    )    
    
    if(!existePeloMenosUmaEmpresaComEsseCNPJ) {
      return resposta.status(404).send(
        {mensagem: codigosDeErros('teste')}
        )
    }

    // Alterar o retorno de dados da empresa para os dados novos
    const alterarDadosDaEmpresa = empresas.map((empresa) => {
      if(empresa.cnpj === cnpj) {
        return {
          cnpj: empresa.cnpj,
          nomeFantasia: nomeFantasia ? nomeFantasia : empresa.nomeFantasia,
          dataDeCriacao: dataDeCriacao ? dataDeCriacao : empresa.dataDeCriacao
        }
      }
      return empresa
    })

    criarOuAtualizar('empresa.json', alterarDadosDaEmpresa)
    return resposta.status(200).send({mensagem: "Atualizou a empresa!"})
  },
  async excluirEmpresa(requisicao, resposta) {
    const { cnpj } = requisicao.params
    const empresas = pegarDados('empresa.json')

    if(!empresas) {
      return resposta.status(400).send({mensagem: "Não existem dados para serem atualizados!"})
    }

    const existePeloMenosUmaEmpresaComEsseCNPJ = empresas.some((empresa) => 
      empresa.cnpj === cnpj
    )    
    
    if(!existePeloMenosUmaEmpresaComEsseCNPJ) {
      return resposta.status(404).send(
        {mensagem: `Não existe nenhuma empresa com este cnpj ${cnpj}`}
        )
    }

    const empresasFiltradas = empresas.filter((empresa) => empresa.cnpj !== cnpj)

    criarOuAtualizar('empresa.json', empresasFiltradas)

    return resposta.status(200).send({mensagem: "Empresa excluída"})
  },
  async salvarImagem(requisicao, resposta) {
    const {originalname, buffer} = requisicao.file
    console.log(originalname, buffer)
    writeFileSync(originalname, buffer)
    return resposta.status(201).send({mensagem: "salvou a imagem"})
  }
}