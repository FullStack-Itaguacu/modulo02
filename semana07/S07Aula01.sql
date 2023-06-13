/*
Exercício em SQL: Manipulação de Dados
Tabela: "Clientes"
Colunas:
	ID_Cliente (chave primária)
	Nome
	Idade
	Cidade

Tabela: "Pedidos"
Colunas:
	ID_Pedido (chave primária)
	ID_Cliente (chave estrangeira referenciando ID_Cliente na tabela "Clientes")
	Data
	Valor

Instruções:

*/

create table Clientes(
	cliente_id Serial primary key,
	Nome VARCHAR(50),
	Idade INTEGER,
	Cidade VARCHAR(100)
);

create table Pedidos(
	ID_Pedido Serial primary key,
	ID_Cliente Integer,
	data Date,
	valor Decimal(10,2),
	foreign key (ID_Cliente) references Clientes(ID_Cliente)
);

-- Selecione todos os clientes da tabela "Clientes":
select * from Pedidos;
-- Selecione o nome e a cidade dos clientes que possuem mais de 30 anos:
select nome, cidade from clientes where idade > 30;
-- Selecione a contagem total de clientes por cidade:
select count(*) from Clientes group by Cidade;
-- Selecione o ID do cliente e o valor total de pedidos realizados por ele:
select 
	ID_Cliente, 
	SUM(Valor) as ValorTotal 
from Pedidos group by ID_Cliente;

-- Especificar o nome da chave estrangeira ao criar uma tabela
CREATE TABLE contatos(
   contato_id SERIAL PRIMARY KEY,
   nome VARCHAR(255) NOT NULL,
   telefone VARCHAR(15),
   email VARCHAR(100),
   id_cliente INT,
   CONSTRAINT fk_contatos
      FOREIGN KEY(id_cliente) 
	  REFERENCES clientes(id_cliente)
);

-- Exercício 2
/*
 */
CREATE TABLE Funcionarios (
  ID_Funcionario INT PRIMARY KEY,
  Nome VARCHAR(50),
  Cargo VARCHAR(50)
);

CREATE TABLE Departamentos (
  ID_Departamento INT PRIMARY KEY,
  Nome VARCHAR(50)
);

CREATE TABLE Alocacoes (
  ID_Alocacao INT PRIMARY KEY,
  ID_Funcionario INT,
  ID_Departamento INT,
  DataInicio DATE,
  DataFim DATE,
  FOREIGN KEY (ID_Funcionario) REFERENCES Funcionarios(ID_Funcionario),
  FOREIGN KEY (ID_Departamento) REFERENCES Departamentos(ID_Departamento)
);

/*
 * Selecione o nome do funcionário e 
 * o nome do departamento 
 * para cada alocação 
 * existente na tabela "Alocacoes":
 */

SELECT Funcionarios.Nome, Departamentos.Nome
FROM Alocacoes
INNER JOIN Funcionarios ON 
Alocacoes.ID_Funcionario = Funcionarios.ID_Funcionario
INNER JOIN Departamentos ON 
Alocacoes.ID_Departamento = Departamentos.ID_Departamento;

/*
Selecione o nome do funcionário, 
o nome do departamento e a data de início da alocação 
para todos os funcionários atualmente alocados em 
algum departamento (DataFim é nulo):
*/
SELECT 
	Funcionarios.Nome, 
	Departamentos.Nome, 
	Alocacoes.DataInicio
FROM Alocacoes
INNER JOIN 
	Funcionarios ON 
		Alocacoes.ID_Funcionario = Funcionarios.ID_Funcionario
INNER JOIN 
	Departamentos ON 
	Alocacoes.ID_Departamento = Departamentos.ID_Departamento
WHERE Alocacoes.DataFim IS NULL;


/*
 Selecione o nome do departamento e 
 a quantidade de funcionários atualmente alocados 
 em cada departamento:
*/
SELECT 
	Departamentos.Nome, 
	COUNT(*) AS QuantidadeFuncionarios
FROM Alocacoes
INNER JOIN Departamentos 
	ON Alocacoes.ID_Departamento = Departamentos.ID_Departamento
WHERE Alocacoes.DataFim IS NULL
GROUP BY Departamentos.Nome;
