const http = require("http")
const fs = require("fs")
const querystring = require("querystring")

let formHtml = '';
try{
  formHtml = fs.readFileSync("index.html", "utf-8")
} catch (erro){
  console.log(erro)
}

function salvarDados(dados){
  console.log(querystring.parse(dados))
}

const server = http.createServer((request, response) => {
  /**
   * WriteHead serve para configura o headers
   * da nossa resposta
   * 
   * # PARAMETROS
   * 1º - código status
   * 2º - tipo de dado a ser enviado
   */
  
  switch(request.url){
    case "/":
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      response.write("<h1>Olá mundo</h1>")
      response.write(`<h1>${request.url}</h1>`)
      response.end()
      break
    case "/usuario":
      switch(request.method){
        case "GET":
          response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
          response.write(formHtml)
          response.end()
          break
        case "POST":
          // leitura dos dados
          let dados = ''
          request.on("data", (data) => {
            // aqui vamos monitorar cada pedacinho que recebemos
            dados += data
          })
          request.on("end", () => {
            console.log("Dados enviados com sucesso!")
            salvarDados(dados)
          })

          // envia a resposta
          response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
          response.write("<h1>Dados recebidos</h1>")
          response.write("<button onClick='window.location.href = '/usuario''>Voltar</button>")
          response.end()
          break
      }
      break
  }
})

server.listen(3000)
console.log("Servidor rodando na porta http://localhost:3000")