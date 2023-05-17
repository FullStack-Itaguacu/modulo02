/**
 * # Iniciando o servidor
 * [x] - importar o http
 * [x] - importar o fs
 * [x] - importar o querystring
 **/
const http = require("http")
const fs = require("fs")
const querystring = require("querystring")

let formHtml = "";
try {
  formHtml = fs.readFileSync("index.html", "utf-8")
} catch (erro) {
  console.log(erro)
}
 
 /* # criando o servidor
 * [x] - usar o método createServer
 * [x] - passar o callback do createServer
 * [x] - criar switch para monitorar as urls
 * [x] - atribuir o createServer a uma variável
 * [x] - usar o método listen na variável criada e passar a porta
 * */

function salvarDados(dados){
  return querystring.parse(dados)
}

const servidor = http.createServer((request, response) => {
  switch(request.url){
      /* # Exibindo formulário
    * [x] - definir uma url para enviar como resposta o formulário HTML
    * [x] - criar writeHead no response
    * [x] - criar um write no response e passar o conteúdo do HTML
    * [x] - finalizar o envio com o response.end()
    */
    case "/form":  
      switch(request.method){
        /* # Recebendo os dados
        * [x] - criar switch na rota definida para monitorar o POST
        * [x] - criar os métodos on do tipo "data" e do tipo "end" para receber os dados
        * [x] - criar uma função para receber os dados e fazer o tratamento do querystring
        * [x] - no método on do tipo "end" chamar a função criada no passo anterior
        * [x] - retornar uma resposta com uma mensagem de boas vindas e o nome do usuário
        * */
        case "POST":
          let dados = ""
          request.on("data", (data)=> {
            dados += data
          })
          request.on("end", () => {
            console.log("Leitura concluída com sucesso")
            let usuario = salvarDados(dados).nome
            console.log(usuario)
            response.writeHead(200, {"Content-Type": "text/html; charset: utf-8;"})
            response.write(`<h1>Seja bem-vindo ${usuario}</h1>`)
            response.end()
          })
          break
        default:
          // devolver aqui o form HTML
          response.writeHead(200, {"Content-Type": "text/html; charset: utf-8;"})
          response.end(formHtml)
          break
        }
      break
  }
})

servidor.listen(3000)




 

