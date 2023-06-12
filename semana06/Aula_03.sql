create type categoriaEnum as ENUM('Conferência', 
								  'Seminário',
								  'Workshop');

create table local (
	id SERIAL primary key,
	nome varchar(100),
	endereco varchar(100),
	capacidade integer,
	check (capacidade >= 1)
);

create table Categoria (
	id SERIAL primary key,
	nome categoriaEnum,
	descricao varchar(100)	
);

create table participante (
	id SERIAL primary key,
	nome varchar(100),
	email varchar(100)
);

create table evento (
	id SERIAL primary key,
	nome varchar(100),
	data Date,
	local_id Integer,
	categoria_id Integer,
	ativo Boolean default true,
	FOREIGN KEY (local_id) REFERENCES Local(ID),
	FOREIGN KEY (categoria_id) REFERENCES Categoria(ID),
	check (data > current_date)
);

create table ParticipantesEventos (
	participante_id Integer,
	evento_id Integer,
	FOREIGN key (participante_id) references Participante(Id),
	FOREIGN key (evento_id) references Evento(Id)
);

select participante.nome, evento.nome * from participante, evento;




