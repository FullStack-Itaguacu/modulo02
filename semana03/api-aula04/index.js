const http = require("http")
const fs = require("fs")
const querystring = require("querystring")

function ListarProdutos(){
  try {
    const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8"))
    return JSON.stringify(dados.produtos)
  } catch (erro){
    return "Erro ao executar"
  }
}

function CriarProduto(novoProduto){
  try {
    const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8"))
    dados.produtos.push(JSON.parse(novoProduto))
    fs.writeFileSync("dados.json", JSON.stringify(dados))
    return "Produto cadastrado com sucesso!"
  } catch {
    return "Erro ao executar"
  }
}

function EditarProduto(prod){

  // "\'nome'\:\'fone'\,\""
  try{
    const dados = JSON.parse(fs.
      readFileSync("dados.json", "utf-8"))
    
    let produto = JSON.parse(prod)

    dados.produtos.map(x => {
      if(x.id == produto.id){
        Object.assign(x, produto)
      }
    })

    fs.writeFileSync("dados.json", JSON.stringify(dados))
    return "Produto atualizado com sucesso!"
  } catch(erro){
    return "Erro ao executar: " + erro.message
  }
}

function RemoverProduto(id){
  try {
    const dados = JSON.parse(fs.
      readFileSync("dados.json", "utf-8"))

    dados.produtos = dados.produtos.filter(produto => produto.id != id)

    fs.writeFileSync("dados.json", JSON.stringify(dados))
    return "Produto removido com sucesso!"
  } catch (erro){
    return "Erro ao executar: " + erro.message
  }
}



const servidor = http.createServer((request, response) => {
  if(request.url == "/produto"){
    switch(request.method){
      case "GET":
        response.writeHead(200, {"Content-Type": "application/json; charset: utf-8;"})
        response.end(ListarProdutos())
        break
      case "POST":
        let produto = ''
        request.on("data", (chunk) => {
          produto += chunk
        })
        request.on("end", () => {
          response.writeHead(200, {"Content-Type": "text/plain; charset: utf-8;"})
          response.end(CriarProduto(produto))
        })
        break
      case "PUT":
        let produtoPut = ''
        request.on("data", (chunk) => {
          produtoPut += chunk
        })
        request.on("end", () => {
          response.writeHead(200, {"Content-Type": "text/plain; charset: utf-8;"})
          response.write(EditarProduto(produtoPut))
          response.end()
        })
        break
      case "DELETE":
        let id = ''
        request.on("data", (chunk) => {
          id += chunk
        })
        request.on("end", () => {
          response.writeHead(200, {"Content-Type": "text/plain; charset: utf-8;"})
          response.end(RemoverProduto(id))
        })
        break
    }
  } else {
    response.writeHead(200, {"Content-Type": "text/plain; charset: utf-8;"})
    response.end("O endpoint padrão é o '/produto'")
  }
})
  
servidor.listen(3000)
console.log("Servidor rodando na porta http://localhost:3000")
