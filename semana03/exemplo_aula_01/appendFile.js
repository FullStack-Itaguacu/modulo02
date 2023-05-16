const fs = require("fs")

let conteudo = "\nEste é o conteúdo a ser escrito."

/**
 * Serve para adicionar mais conteúdo a um arquivo,
 * porém mantém o que já existe
 * 
 * # PARAMETROs
 * 1º - arquivo/caminho a ser utilizado
 * 2º - conteúdo a ser adicionado
 * 3º - encoding (opcional) - utf-8
 * 4º - função callback
 */
fs.appendFile("arquivo2.txt", conteudo, "utf-8", (erro) => {
  if(erro) throw erro
  console.log("Conteúdo adicionado com sucesso!")
})

/**
 * Serve para adicionar mais conteúdo a um arquivo,
 * porém mantém o que já existe
 * 
 * # PARAMETROs
 * 1º - arquivo/caminho a ser utilizado
 * 2º - conteúdo a ser adicionado
 * 3º - encoding (opcional) - utf-8
 */
try{
  fs.appendFileSync("arquivo2.txt", conteudo, "utf-8")
  console.log('Conteúdo adicionado com sucesso')
} catch (erro){
  console.log(erro)
}