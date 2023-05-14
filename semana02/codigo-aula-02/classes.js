/* CLASSES
 * É a representação em código de objetos da vida real.
 * São as características e comportamentos de algo.
 * 
 * ABSTRAÇÃO
 * É selecionar apenas as características e comportamentos
 * que de fato serão úteis.
*/

class Animal {
  // recebe os valores iniciais para instância do objeto
  constructor(nome, especie, genero, peso){
    this.especie = especie
    this.nome = nome
    this.genero = genero
    this.peso = peso
  }

  comer(){
    console.log("Animal está comendo...")
  }
}

/* OBJETOS
 * É a implementação de uma classe.
*/

// implementação de uma classe -> objeto
const cachorro = new Animal("Rex", "Cachorro", "M", 20)
cachorro.cor = "Marrom"

// console.log(cachorro)

const produto = {
  // chave | valor
  nome: "Caneta",
  valor: 2,
  cor: 'Preta',
  peso: 2
}

const produto2 = {}

Object.assign(produto, produto2)

// antes
console.log(produto2.cor)

produto2.cor = 'Azul'

// depois
console.log(produto)



