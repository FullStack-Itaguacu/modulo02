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
    return resposta.status(200).send({mensagem: "Criou uma empresa!"})
  }
}