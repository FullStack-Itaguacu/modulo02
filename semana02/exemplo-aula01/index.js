const http = require("http")

http.createServer((requisicao, resposta) => {
  resposta.writeHead(200, {"Content-Type": "text/html"})
  resposta.write("<h1>Outra mensagem</h1>\n")
  resposta.end("Hello, world!")
}).listen(3050)

console.log("servidor rodando na porta http://localhost:3050")