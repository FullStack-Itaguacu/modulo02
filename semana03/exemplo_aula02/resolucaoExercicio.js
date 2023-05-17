/**
 * # Iniciando o servidor
 * [] - importar o http
 * [] - importar o fs
 * [] - importar o querystring
 * 
 * # criando o servidor
 * [] - usar o método createServer
 * [] - passar o callback do createServer
 * [] - criar switch para monitorar as urls
 * [] - atribuir o createServer a uma variável
 * [] - usar o método listen na variável criada e passar a porta
 * 
 * # Criando o formulário
 * [] - criar arquivo HTML
 * [] - criar form com input type text para receber o nome
 * [] - importar o HTML no index.js
 * 
 * # Exibindo formulário
 * [] - definir uma url para enviar como resposta o formulário HTML
 * [] - criar writeHead no response
 * [] - criar um write no response e passar o conteúdo do HTML
 * [] - finalizar o envio com o response.end()
 * 
 * # Recebendo os dados
 * [] - criar switch na rota definida para monitorar o POST
 * [] - criar os métodos on do tipo "data" e do tipo "end" para receber os dados
 * [] - criar uma função para receber os dados e fazer o tratamento do querystring
 * [] - no método on do tipo "end" chamar a função criada no passo anterior
 * [] - retornar uma resposta com uma mensagem de boas vindas e o nome do usuário
 * */