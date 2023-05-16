// importação do modulo fs
const fs = require("fs")

// writeFile - Escrever arquivos - Não bloquante
let conteudo = 'Este é o texto que vai ser escrito no meu arquivo.'
// let conteudo = 'Este é um outro texto que vai ser escrito no meu arquivo depois.'

/**
 * O writefile ele apaga tudo que já existe no arquivo
 * e deixa somente o que estou enviando agora.
 * 
 * # PARAMETROS:
 * 1º - arquivo a ser utilizado
 * 2º - o conteúdo a ser escrito
 * 3º - função de callback
 */
fs.writeFile("arquivo.txt", conteudo, "utf-8", (erro)=>{
  if(erro) throw erro
  console.log('Arquivo escrito com sucesso!')
})

/**
 * O write file sync ele é um método bloqueante
 *
 * 1º - arquivo/caminho a ser escrito
 * 2º - conteúdo a ser escrito
 */
try{
  fs.writeFileSync("src/arquivo.txt", conteudo)
  console.log("Função executada com sucesso!")
} catch (erro) {
  console.log(erro)
}

console.log("Este console está após o write file")