const fs = require('fs');

// Dados que serão escritos no arquivo JSON
const data = {
  nome: 'João',
  idade: 30,
  profissao: 'Desenvolvedor'
};

// Converter dados em uma string JSON
const jsonData = JSON.stringify(data);

// Escrever dados no arquivo
fs.writeFileSync('dados.json', jsonData);