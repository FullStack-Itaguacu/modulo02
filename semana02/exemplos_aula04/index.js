// console.log(somar(10, 5))
// functions expressions
// function somar(a, b){
//   return a + b
// }

// console.log(somar2(10, 5))

// // functions declaration
// let somar2 = function (a, b) {
//   return a + b
// }

// função nomeada
// function somar(a, b){
//   return a + b
// }

// // função anonima
// const soma = function (a, b){
//   return a + b
// }

// arrow function
// const soma2 = (a, b) => a + b

// função com parametros com valores default
// function somar(a = 3, b = 5){
//   return a + b
// }
// function subtrai(a = 3, b = 5){
//   return a - b
// }

// function executa(callback, a, b){
//   return callback(a, b)
// }

// let value = executa(somar, 10, 5)
// let value2 = executa(subtrai, 10, 5)

// console.log(value)
// console.log(value2)

// function somar3segundos(a, b){
//   /*
//     1 - [x] - instanciar a promise
//     2 - [x] - passar um callback como parâmetro para a promise
//     3 - [x] - passar dois parâmetros no callback
//       - resolve
//       - reject
//   */
//   return new Promise((resolve, reject)=>{
//     // retornar o resultado
//     // simular a demora de uma API
//     try {
//       setTimeout(()=>{
//         resolve(a + b)
//       }, 3000)
//     } catch (error){
//       reject(error)
//     }
//   })
// }

// let value = somar3segundos(10, 5)
//                 .then(resultado => resultado - 5) // 10
//                 .then(resultado => resultado - 5) // 5
//                 .then(resultado => console.log(resultado)) // 5
//                 // pega o resultado do then superior
//                 .catch(erro => console.log("Erro: ", erro))

// console.log("executando...")

const dados = []

async function buscarDados(){
  // configura a busca passando a url
  try {
    await fetch("https://api.github.com/users/Bruno-Costa-fig")
      // trata os dados que recebemos
      .then(resultado => resultado.json())
      // atribui o resultado ao array
      .then(resultado => {
        dados.push(resultado)
        console.log("Console linha 86: ", dados)
      })
      .catch(erro => console.log(erro))
  } catch (error){
    console.error("Erro: ", error)
  } finally {
    console.log("Execução finalizada")
  }

  console.log("Console linha 92: ", dados)
}

buscarDados()


