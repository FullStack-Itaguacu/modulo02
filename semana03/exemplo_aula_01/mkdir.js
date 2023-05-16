const fs = require("fs")

/**
 * Serve para criar uma pasta/diretório
 * 
 * # PARAMETROS
 * 1º - caminho a ser usado
 * 2º - função callback
 */
fs.mkdir("exemplo/exemplo2", (erro) => {
  if(erro) throw erro
  console.log("Pasta criada com sucesso!")
})

/**
 * Serve para criar uma pasta/diretório
 * 
 * # PARAMETROS
 * 1º - caminho a ser usado
 */
try {
  fs.mkdirSync("exemplo/exemplo3")
  console.log("Pasta criada com sucesso")
} catch (erro){
  console.log(erro)
}