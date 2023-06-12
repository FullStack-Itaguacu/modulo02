CREATE TABLE Clientes (
  cliente_id INT PRIMARY KEY,
  nome VARCHAR(50)
);

CREATE TABLE Pedidos (
  pedido_id INT PRIMARY KEY,
  cliente_id INT,
  produto VARCHAR(50),
  quantidade INT,
  FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id)
);

INSERT INTO Clientes (cliente_id, nome) VALUES
  (1, 'João'),
  (2, 'Maria'),
  (3, 'Pedro'),
   (4, 'Rawan');

INSERT INTO Pedidos (
		pedido_id, 
		cliente_id, 
		produto, 
		quantidade) VALUES
  (1, 1, 'Camiseta', 2),
  (2, 1, 'Calça', 1),
  (3, 2, 'Jaqueta', 1),
  (4, 3, 'Sapato', 2);
 
 -- Adicionando um item exclusivo a tabela da esquerda
INSERT INTO Pedidos (pedido_id, produto, quantidade) VALUES
  (6, 'Camiseta', 6);

select * from Clientes;
select * from Pedidos;


/* Podemos Imaginar o seguinte:
 * Clientes ao Conjunto de Classes a esquerda
 * Pedidos ao Conjunto de Classes direita
*/

-- Extrair os pedidos de cada cliente: LEFT JOIN

SELECT 
	c.nome, 
	p.produto,
	p.quantidade
FROM Clientes as C
LEFT JOIN Pedidos as P ON C.cliente_id = P.cliente_id;

/*
 Extrair as informações apenas dos pedidos 
 feitos por clientes : Inner Join, 
 pois assim só seleciono os clientes cadastrados 
 com pedidos
*/ 

SELECT 
	Clientes.cliente_id, 
	Clientes.nome, 
	Pedidos.pedido_id, 
	Pedidos.produto,
	Pedidos.quantidade
FROM Clientes
INNER JOIN Pedidos 
	ON Clientes.cliente_id = Pedidos.cliente_id;

/* Para saber quais Clientes não tem pedidos, ou seja,
 * o conjunto a esquerda excluindo o conjunto a direita.
 * Podemos então usar o Left Excluding Join
 */

SELECT 
	c.nome, 
	p.produto,
	p.quantidade
FROM Clientes as C
LEFT JOIN Pedidos as P ON C.cliente_id = P.cliente_id
where P.cliente_id is Null;


-- PARTE 2 da AULA


-- COUNT (*)

CREATE TABLE Clientes (
  id INT,
  nome VARCHAR(50),
  idade INT
);

INSERT INTO Clientes (id, nome, idade)
VALUES (1, 'João', 25),
       (2, 'Maria', 30),
       (3, 'Pedro', 18),
       (4, 'Ana', 40),
       (5, 'Carlos', 22),
       (6, 'Bruno', 17);

select * from clientes;
      
SELECT COUNT(*) AS total_clientes
FROM Clientes;
      
SELECT COUNT(*) AS total_clientes_adultos
FROM Clientes
WHERE idade >= 18;


--- Exercícios
/*
Suponha que temos duas tabelas: "Clientes" e "Pedidos". 
A tabela "Clientes" contém informações sobre os clientes, 
como nome, ID e endereço, 
enquanto a tabela "Pedidos" contém detalhes 
sobre os pedidos feitos pelos clientes, 
como o ID do pedido, a data do pedido e o 
ID do cliente associado a esse pedido.
*/

CREATE TABLE Clientes (
    ID INT PRIMARY KEY,
    Nome VARCHAR(50),
    Endereco VARCHAR(100)
);

CREATE TABLE Pedidos (
    ID INT PRIMARY KEY,
    DataPedido DATE,
    ClienteID INT,
    quantidade int,
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ID)
);

	INSERT INTO Clientes (ID, Nome, Endereco)
values
    (1, 'João', 'Rua A'),
    (2, 'Maria', 'Rua B'),
    (3, 'Pedro', 'Rua C'),
    (4, 'Bruno', 'Rua A'),
    (5, 'Pedro', 'Rua B'),
    (6, 'Gustavo', 'Rua C');

   INSERT INTO Pedidos (ID, DataPedido, ClienteID, quantidade)
VALUES
    (1, '2023-05-01', 1, 12),
    (2, '2023-05-02', 2, 10),
    (3, '2023-05-03', 2, 1 ),
    (4, '2023-05-04', 3, 2 ),
    (5, '2023-05-05', 3, 3 );
   
   INSERT INTO Pedidos (ID, DataPedido)
VALUES
    (6, '2023-05-06'),
    (7, '2023-05-07');


SELECT 
	Clientes.Nome as cliente,
	COUNT(Pedidos.quantidade) as total_de_pedidos
FROM Clientes
LEFT JOIN Pedidos ON Clientes.ID = Pedidos.ClienteID
group by Clientes.Nome;


/* 
  Escreva a função sql para retornar o número
		de funcionários por departamento.
*/

-- Tabela "departamentos"
CREATE TABLE departamentos (
  id_departamento INT PRIMARY KEY,
  nome_departamento VARCHAR(50)
);

-- Tabela "funcionários"
CREATE TABLE funcionarios (
  id_funcionario INT PRIMARY KEY,
  nome_funcionario VARCHAR(50),
  id_departamento INT,
  FOREIGN KEY (id_departamento) 
  REFERENCES departamentos (id_departamento)
);

INSERT INTO departamentos (id_departamento, nome_departamento)
VALUES (1, 'Vendas');

INSERT INTO departamentos (id_departamento, nome_departamento)
VALUES (2, 'Marketing');

INSERT INTO funcionarios (id_funcionario, nome_funcionario, id_departamento)
VALUES (1, 'João', 1);

INSERT INTO funcionarios (id_funcionario, nome_funcionario, id_departamento)
VALUES (2, 'Maria', 1);

INSERT INTO funcionarios (id_funcionario, nome_funcionario, id_departamento)
VALUES (3, 'Pedro', 2);


select d.nome_departamento,
		count(f.id_funcionario) as total_de_funcionarios
from departamentos d
left join funcionarios f on d.id_departamento = f.id_departamento
group by d.nome_departamento;




