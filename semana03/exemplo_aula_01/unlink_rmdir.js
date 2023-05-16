const fs = require("fs")

/**
 * Serve para apagar um arquivo
 * 
 * # PARAMETROS
 * 1º - caminho do arquivo a ser removido
 * 2º - callback
 */

// arquivo
fs.unlink("arquivo.txt", (erro)=>{
  if(erro) throw erro
  console.log("Arquivo removido com sucesso!")
})

// diretorio
fs.rmdir("pasta_terminal", (erro)=>{
  if(erro) throw erro
  console.log("Arquivo removido com sucesso!")
})

/**
 * Serve para apagar um arquivo
 * 
 * # PARAMETROS
 * 1º - caminho do arquivo a ser removido
 */

// arquivo
try{
  fs.unlinkSync("arquivo.txt")
} catch (erro){
  console.log(erro)
}

// diretorio
try{
  fs.rmdirSync("exemplo")
} catch (erro){
  console.log(erro)
}