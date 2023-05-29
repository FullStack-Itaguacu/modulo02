const sistemasDeArquivos = require('fs')

function validaEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return regex.test(email);
}

function criarOuAtualizar(nomeDoArquivo, dados) {
  try {
    sistemasDeArquivos.writeFileSync('' + nomeDoArquivo, 
    JSON.stringify(dados))
  } catch (error) {
    throw error
  }
}

function pegarDados(nomeDoArquivo) {
  try {
    const resultadoDaBusca = JSON.parse(
      sistemasDeArquivos.readFileSync('' + nomeDoArquivo, 'utf8')
      )
    return resultadoDaBusca
  } catch (error) {
    return null
  }
}

module.exports = {
  validaEmail,
  criarOuAtualizar,
  pegarDados
}