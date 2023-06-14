
-- FORMA EXPLICITA PADRÃO

CREATE TABLE Carro
(
    ID_Carro integer PRIMARY KEY AUTOINCREMENT,
    Nome varchar(255),
    Marca varchar(255),
    ID_Pessoa integer,
    CONSTRAINT fk_PesCarro FOREIGN KEY (ID_Pessoa) REFERENCES Pessoa (ID_Pessoa)
);

-- FORMA EXPLICITA com nomeação automatica

CREATE TABLE Carro
(
    ID_Carro integer PRIMARY KEY AUTOINCREMENT,
    Nome varchar(255),
    Marca varchar(255),
    ID_Pessoa integer,
    FOREIGN KEY (ID_Pessoa) REFERENCES Pessoa (ID_Pessoa)
);

-- Adicionar na tabela ( Carro ), uma chave estrageira em uma coluna existente (id_pessoa)

/* Esse formato especifica o nome da chave_estrangeira e atribui 
 * á coluna ID_Pessoa na tabela Carro, fazendo referencia a tabela Pessoa.id_pessoa.
 * O Resultado é o mesmo que usar o formato padrão explicito.
 */

CREATE TABLE Carro
(
    ID_Carro integer PRIMARY KEY AUTOINCREMENT,
    Nome varchar(255),
    Marca varchar(255),
    ID_Pessoa integer,
)

alter table Carro
(
	add constraint fk_PesCarro FOREIGN KEY (ID_Pessoa) REFERENCES Pessoa (ID_Pessoa) 
)

-- 