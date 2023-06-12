-- Criação da tabela de projetos
CREATE TABLE projetos (
  id INT PRIMARY KEY,
  nome VARCHAR(100),
  descricao TEXT,
  data_inicio DATE,
  data_fim DATE
);

-- Criação da tabela de categorias
CREATE TABLE categorias (
  id INT PRIMARY KEY,
  nome VARCHAR(100),
  descricao TEXT
);

-- Criação da tabela de tarefas
CREATE TABLE tarefas (
  id INT PRIMARY KEY,
  nome VARCHAR(100),
  descricao TEXT,
  projeto_id INT,
  categoria_id INT,
  data_inicio DATE,
  data_prazo DATE,
  concluida BOOLEAN,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Inserção de dados na tabela de projetos
INSERT INTO projetos (id, nome, descricao, data_inicio, data_fim) VALUES
  (1, 'Projeto A', 'Descrição do Projeto A', '2023-01-01', '2023-02-28'),
  (2, 'Projeto B', 'Descrição do Projeto B', '2023-03-01', '2023-04-30'),
  (3, 'Projeto C', 'Descrição do Projeto C', '2023-05-01', '2023-06-30');

-- Inserção de dados na tabela de categorias
INSERT INTO categorias (id, nome, descricao) VALUES
  (1, 'Tarefa pessoal', 'Tarefas relacionadas a assuntos pessoais'),
  (2, 'Tarefa profissional', 'Tarefas relacionadas ao trabalho'),
  (3, 'Tarefa acadêmica', 'Tarefas relacionadas a estudos');

-- Inserção de dados na tabela de tarefas
INSERT INTO tarefas (id, nome, descricao, projeto_id, categoria_id, data_inicio, data_prazo, concluida) VALUES
  (1, 'Tarefa 1', 'Descrição da Tarefa 1', 1, 1, '2023-01-05', '2023-01-15', true),
  (2, 'Tarefa 2', 'Descrição da Tarefa 2', 1, 2, '2023-01-10', '2023-01-20', false),
  (3, 'Tarefa 3', 'Descrição da Tarefa 3', 2, 3, '2023-03-05', '2023-03-15', false),
  (4, 'Tarefa 4', 'Descrição da Tarefa 4', 2, 1, '2023-03-10', '2023-03-20', false),
  (5, 'Tarefa 5', 'Descrição da Tarefa 5', 3, 2, '2023-05-05', '2023-05-15', false);

-- Consulta básica de tarefas com informações do projeto, categoria e data de prazo
SELECT tarefas.nome AS tarefa, 
	projetos.nome AS projeto, 
	categorias.nome AS categoria, 
	tarefas.data_prazo, 
	tarefas.concluida
FROM tarefas
INNER JOIN projetos ON tarefas.projeto_id = projetos.id
INNER JOIN categorias ON tarefas.categoria_id = categorias.id

-- Retornar todas as tarefas concluídas:
SELECT *
FROM tarefas
WHERE concluida = true;
-- Retornar todas as tarefas atrasadas:
SELECT *
FROM tarefas
WHERE data_prazo < CURRENT_DATE
  AND concluida = false;
-- Retornar a contagem de tarefas por projeto:
SELECT 
	projetos.nome AS projeto, 
	COUNT(tarefas.id) AS quantidade_tarefas
FROM projetos
LEFT JOIN tarefas ON projetos.id = tarefas.projeto_id
GROUP BY projetos.id, projetos.nome;

