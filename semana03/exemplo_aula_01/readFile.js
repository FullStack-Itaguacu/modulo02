const fs = require("fs")

/**
 * O read file serve para ler o conteúdo de um arquivo
 * 
 * # PARAMETRO:
 * 1º - arquivo/caminho do arquivo a ser lido
 * 2º - encoding - utf-8
 * 3º - callback
 *  - erro
 *  - dados
 */
fs.readFile("arquivo.txt", "utf-8", (erro, dados)=> {
  if(erro) throw erro
  console.log(dados)
})

/**
 * O read file serve para ler o conteúdo de um arquivo
 * 
 * # PARAMETRO:
 * 1º - arquivo/caminho do arquivo a ser lido
 * 2º - encoding - utf-8
 * 
 * Precisamos receber o resultado em uma variável
 */
try {
  const dados = fs.readFileSync("arquivo.txt", "utf-8")
  console.log(dados)
} catch (erro){
  console.log(erro)
}

console.log("Este console está após o readFile")