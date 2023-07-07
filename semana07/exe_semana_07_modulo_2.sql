-- Ex 1 e Ex 2
CREATE TABLE Usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(40),
  login VARCHAR(40) UNIQUE,
  email VARCHAR(40) UNIQUE,
  senha VARCHAR(40),
  cpf VARCHAR(11),
  rg VARCHAR(10),
  dt_nascimento DATE,
  CONSTRAINT maior_de_idade CHECK (dt_nascimento <= CURRENT_DATE - INTERVAL '18 years')
);

CREATE TABLE Plataforma (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255)
);

CREATE TABLE Genero (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255)
);

CREATE TABLE Jogo (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  dt_lancamento DATE,
  foto VARCHAR(255),
  video VARCHAR(255),
  genero_id INT,
  FOREIGN KEY (genero_id) REFERENCES Genero (id)
);

-- Criação da tabela de relação entre Jogos e Plataformas
CREATE TABLE PlataformaJogo (
  jogo_id INT,
  plataforma_id INT,
  FOREIGN KEY (jogo_id) REFERENCES Jogo(id),
  FOREIGN KEY (plataforma_id) REFERENCES Plataforma(id),
  PRIMARY KEY (jogo_id, plataforma_id)
);

-- Ex: 3

-- Criação da tabela de relação entre Jogos e Usuários
CREATE TABLE Biblioteca (
  jogo_id INT,
  usuario_id INT,
  FOREIGN KEY (jogo_id) REFERENCES Jogo(id),
  FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
  PRIMARY KEY (jogo_id, usuario_id)
);

INSERT INTO Plataforma (nome)
VALUES ('PS1'), ('PS2'), ('PS3'), ('PS4'), ('PS5'), ('Xbox Series S'), ('Xbox Series X'), ('PC');

INSERT INTO Genero (nome)
VALUES ('Simulação'), ('Ação'), ('FPS'), ('Estraégia'), ('Outros');

INSERT INTO Usuario (nome, login, email, senha, cpf, rg, dt_nascimento)
VALUES ('Derpson da Silva', 'derpinho', 'derpinho91@hotmail.com', 'derpinho91', '12312312312', '4123123', '1991-01-01');

INSERT INTO Jogo (nome, dt_lancamento, foto, video, genero_id)
VALUES ('The Sims 4 Base', '2014-09-02', 'caminho_da_foto', 'caminho_do_video', 1);

INSERT INTO PlataformaJogo (jogo_id, plataforma_id)
VALUES (1, 4), (1, 5), (1, 8);

INSERT INTO Biblioteca (jogo_id, usuario_id)
VALUES (1, 1);

--Ex 4

SELECT Nome_do_filme, Duracao_do_filme_em_minutos
FROM Filme
WHERE Nome_do_filme LIKE '%Ação'
ORDER BY Duracao_do_filme_em_minutos;

-- Ex 5

SELECT P.nome_pais, E.nome_estado, C.nome_cidade
FROM Cidade AS C
JOIN Estado AS E ON C.id_estado = E.id_estado
JOIN Pais AS P ON E.id_pais = P.id_pais
WHERE C.capital = 'True'
  AND C.qtd_populacao > 500000
  AND (E.nome_estado LIKE 'São%' OR E.nome_estado LIKE 'Santo%' OR E.nome_estado LIKE 'San%' OR E.nome_estado LIKE 'Saint%')
  AND P.continente IN ('América do Norte', 'América Central', 'América do Sul')
ORDER BY P.nome_pais, E.nome_estado, C.nome_cidade;

-- Ex 6

SELECT P.nome_pais, SUM(C.qtd_populacao) AS populacao_total
FROM Pais AS P
JOIN Estado AS E ON P.id_pais = E.id_pais
JOIN Cidade AS C ON E.id_estado = C.id_estado
WHERE P.continente = 'Europa' AND E.nome_estado = 'Espanha'
GROUP BY P.nome_pais
HAVING SUM(C.qtd_populacao) < (
    SELECT SUM(C2.qtd_populacao)
    FROM Cidade AS C2
    JOIN Estado AS E2 ON C2.id_estado = E2.id_estado
    WHERE E2.nome_estado = 'Espanha'
)
ORDER BY populacao_total DESC;

-- Ex 7

SELECT U.nome_usuario, SUM(V.valor_produto * V.quantidade_produto) AS valor_total_gasto
FROM Usuario AS U
JOIN Venda AS V ON U.id_usuario = V.id_usuario
WHERE EXTRACT(MONTH FROM V.dt_compra) = 11
GROUP BY U.nome_usuario
ORDER BY valor_total_gasto DESC;

-- Ex 8

SELECT U.nome_usuario, SUM(V.valor_passagem) AS valor_total_gasto
FROM Usuario AS U
JOIN Reserva AS R ON U.id_usuario = R.id_usuario
JOIN Viagem AS V ON R.id_viagem = V.id_viagem
WHERE EXTRACT(MONTH FROM V.data_viagem) = 7
GROUP BY U.nome_usuario
ORDER BY valor_total_gasto DESC;
