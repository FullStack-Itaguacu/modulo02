create table Cliente(
	id serial primary key,
	cpf integer,
	nome varchar(60),
	dtnasc date
);

create table Modelo(
	id serial primary key,
	codModelo INTEGER,
	descricao VARCHAR(40),
	ano NUMERIC(4)
);

create table Veiculo(
	id serial primary key,
	placa varchar(8),
	cor varchar(20),
	cliente_id integer,
	modelo_id integer,
	foreign key (cliente_id) references cliente(id),
	foreign key (modelo_id) references modelo(id)
);

create table Patio(
	id serial primary key,
	num INTEGER,
	endereco VARCHAR(40),
	capacidade INTEGER
);

create table Estaciona(
	id serial primary key,
	num INTEGER,
	patio_id integer,
	veiculo_id integer,
	dataEntrada DATE,
	dataSaida DATE,
	horarioEntrada TIME,
	horarioSaida TIME,
	foreign key (patio_id) references Patio(id),
	foreign key (veiculo_id) references Veiculo(id),
	check(horarioEntrada between '8:00:00' and '22:00:00'),
	check(horarioSaida between '8:00:00' and '22:00:00'),
	check(horarioSaida>=horarioEntrada)
);

-- Inserindo alguns valores
-- Inserindo valores:
INSERT INTO Cliente (cpf, nome, dtNasc)
VALUES
  (111111111, 'João Silva', '1990-01-01'),
  (222222222, 'Maria Santos', '1985-05-10'),
  (333333333, 'Pedro Oliveira', '1992-08-15'),
  (444444444, 'Ana Souza', '1982-12-20'),
  (555555555, 'Lucas Pereira', '1998-03-25'),
  (666666666, 'Mariana Costa', '1995-07-05'),
  (777777777, 'Carlos Rodrigues', '1991-09-12'),
  (888888888, 'Camila Almeida', '1987-11-18'),
  (999999999, 'Gustavo Santos', '1993-04-30'),
  (123456789, 'Larissa Fernandes', '1989-06-08');

 
INSERT INTO Modelo (codModelo, descricao, ano)
VALUES
  (1, 'Sedan', 2012),
  (2, 'SUV', 2004),
  (3, 'Hatchback', 2005),
  (4, 'Caminhonete', 2007),
  (5, 'Esportivo', 2007),
  (6, 'Coupé', 2020);
  
INSERT INTO Veiculo (placa, cor, cliente_id, modelo_id)
VALUES
  ('ABC1234', 'Prata', 1, 1),
  ('DEF5678', 'Preto', 2, 2),
  ('GHI9012', 'Branco', 3, 3),
  ('jjj-2020', 'Azul', 4, 4),
  ('MNO7890', 'Vermelho', 5, 5),
  ('PQR2345', 'Cinza', 6, 6),
  ('STU6789', 'Prata', 1, 2),
  ('VWX0123', 'Preto', 2, 3),
  ('YZA4567', 'Branco', 3, 4),
  ('BCD8901', 'Azul', 4, 5),
  ('EFG2345', 'Vermelho', 5, 6),
  ('HIJ6789', 'Cinza', 6, 1);
  
INSERT INTO Patio (num, endereco, capacidade)
VALUES
  (1, 'Rua A', 20),
  (2, 'Rua B', 15),
  (3, 'Rua C', 10),
  (4, 'Rua D', 25);
  
INSERT INTO Estaciona (num, patio_id, veiculo_id, dataEntrada, dataSaida, horarioEntrada, horarioSaida)
VALUES
  (1, 1, 1,'2023-06-01', '2023-06-01', '08:00:00', '09:30:00'),
  (2, 2, 2,'2023-06-01', '2023-06-01', '09:30:00', '11:00:00'),
  (3, 3, 3,'2023-06-01', '2023-06-01', '12:00:00', '14:00:00'),
  (4, 1, 5,'2023-06-02', '2023-06-02', '10:00:00', '12:30:00'),
  (5, 2, 6,'2023-06-02', '2023-06-02', '14:00:00', '16:00:00'),
  (6, 4, 7,'2023-06-02', '2023-06-02', '16:30:00', '18:30:00'),
  (7, 1, 8,'2023-06-03', '2023-06-03', '08:30:00', '09:45:00'),
  (8, 2, 9,'2023-06-03', '2023-06-03', '10:30:00', '12:30:00'),
  (9, 3, 10,'2023-06-03', '2023-06-03', '13:00:00', '15:00:00'),
  (10, 1, 11,'2023-06-04', '2023-06-04', '09:00:00', '11:30:00'),
  (11, 2, 12,'2023-06-04', '2023-06-04', '12:30:00', '14:30:00'),
  (12, 3, 1,'2023-06-04', '2023-06-04', '15:30:00', '17:30:00'),
  (13, 1, 2,'2023-06-05', '2023-06-05', '09:00:00', '10:15:00'),
  (14, 2, 4,'2023-06-05', '2023-06-05', '11:30:00', '13:00:00'),
  (15, 4, 11,'2023-06-05', '2023-06-05', '13:30:00', '15:30:00'),
  (15, 4, 3,'2023-06-06', '2023-06-06', '13:30:00', '15:30:00');
 
INSERT INTO Estaciona (num, patio_id, veiculo_id, dataEntrada, horarioEntrada)
	VALUES
  (7, 1, 5, '2023-06-13', '08:30:00'),
  (8, 2, 3, '2023-06-13', '10:30:00'),
  (9, 3, 9, '2023-06-13', '13:00:00');
 
 -- Exiba a placa e o nome dos donos de todos os veículos;
 select veiculo.placa, cliente.nome
 from veiculo
 join Cliente on veiculo.cliente_id = cliente.id;

-- Exiba o CPF e o nome do cliente que possui o veículo de placa “JJJ-2020”;
select cliente.cpf, cliente.nome
from cliente
join veiculo on veiculo.cliente_id = cliente.id
where veiculo.placa = 'jjj-2020';

-- Exiba a placa e a cor do veículo que possui o código de estacionamento 1;
select veiculo.placa, veiculo.cor
from veiculo
join estaciona on estaciona.veiculo_id = veiculo.id
where estaciona.num = 1;

--Exiba a placa e o ano do veículo que possui o código de estacionamento 1;
select veiculo.placa, modelo.ano
from veiculo
join modelo on modelo.id = veiculo.modelo_id
join estaciona on estaciona.veiculo_id = veiculo.id
where estaciona.num = 1;

-- Exiba a placa, o ano do veículo e a descrição de seu modelo, 
-- se ele possuir ano a partir de 2000.

select veiculo.placa, modelo.ano as ano, modelo.descricao
from veiculo
join modelo on modelo.id = veiculo.modelo_id
where ano > 2000;

 




