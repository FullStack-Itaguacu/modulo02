const http = require("http")
const fs = require("fs")
const querystring = require("querystring")

function ListarProdutos(){
  try {
    const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8"))
    console.log(dados)
    return JSON.stringify(dados.produtos)
  } catch (erro){
    return "Erro ao executar"
  }
}

function CriarProduto(novoProduto){
  try {
    const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8"))
    
    let produto = JSON.parse(novoProduto)
    let ultimoProduto = dados.produtos[dados.produtos.length - 1]
    produto.id = ultimoProduto.id + 1 || 1
    
    dados.produtos.push(produto)

    fs.writeFileSync("dados.json", JSON.stringify(dados))
    return "Produto cadastrado com sucesso!"
  } catch (erro) {
    return "Erro ao executar: " + erro.message
  }
}

function EditarProduto(prod){
  try {
    const dados = JSON.parse(fs.
      readFileSync("dados.json", "utf-8"))
    let produto = JSON.parse(prod)

    dados.produtos.map(x => {
      if(x.id == produto.id){
        Object.assign(x, produto)
      }
    })

    fs.writeFileSync("dados.json", JSON.stringify(dados))
    return JSON.stringify(produto)
  } catch {
    return "Erro ao executar"
  }
}

function RemoverProduto(id){
  try {
    const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8"))
    
    let novoArray = dados.produtos.filter(item => item.id != id)

    dados.produtos = novoArray
    
    fs.writeFileSync("dados.json", JSON.stringify(dados))
    return "Produto removido com sucesso!"
  } catch (erro) {
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
        let dataPost = ''
        request.on("data", (chunk) => {
          dataPost += chunk
        })
        request.on("end", () => {
          response.writeHead(201, {"Content-Type": "text/plain; charset: utf-8;"})
          response.end(CriarProduto(dataPost))
        })
        break
      case "PUT":
        let dataPut = ''
        request.on("data", (chunk) => {
          dataPut += chunk
        })
        request.on("end", () => {
          response.writeHead(200, {"Content-Type": "text/plain; charset: utf-8;"})
          response.end(EditarProduto(dataPut))
        })
        break
      case "DELETE":
        let dataDel = ''
        request.on("data", (chunk) => {
          dataDel += chunk
        })
        request.on("end", () => {
          response.writeHead(202, {"Content-Type": "text/plain; charset: utf-8;"})
          response.end(RemoverProduto(dataDel))
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
