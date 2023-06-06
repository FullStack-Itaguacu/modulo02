/*
 * Este exemplo cria uma nova tabela chamada "Employees"
 *  com colunas para o ID do funcionário, nome, idade e salário.
 */
CREATE TABLE Employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    salary DECIMAL(10,2),
    is_active INT
);

/*
 * Este exemplo adiciona uma nova coluna chamada "department" à tabela "Employees".
 */
ALTER TABLE Employees
ADD COLUMN department VARCHAR(50);

/*
* Este exemplo altera o nome da coluna "age" para "employee_age" na tabela "Employees".
*/
ALTER TABLE Employees
RENAME COLUMN age TO employee_age;

/*
 * Este exemplo aumenta o tamanho do campo "name" na tabela "Employees" 
 * de sua configuração original para VARCHAR(100). 
 * Assim, o campo poderá armazenar strings com até 100 caracteres.
 */
ALTER TABLE Employees
ALTER COLUMN name VARCHAR(100);

/*
* Este exemplo exclui a tabela "Employees" e todos os seus dados.;
*/
DROP TABLE Employees;

/*
 * Este exemplo insere um novo registro na tabela "Employees" com um ID de 1, 
 * nome de "John Doe", idade de 30 e salário de 50000.00.
 */
INSERT INTO Employees (id, name, age, salary)
VALUES (1, 'John Doe', 30, 50000.00);


/*
* Este exemplo atualiza o salário do funcionário com ID 1
*  para 55000.00 na tabela "Employees".
*/
UPDATE Employees
SET salary = 55000.00
WHERE id = 1;

/*
* Este exemplo remove o registro do funcionário com ID 1 da tabela "Employees".
*/
DELETE FROM Employees
WHERE id = 1;

/*
* Este exemplo seleciona todos os registros da tabela "Employees" 
* e retorna todas as colunas.
*/
SELECT * FROM Employees;

/*
* Este exemplo seleciona todas os registros na coluna nome da tabela "Employees" 
* e retorna o resultado dando um apelido a coluna nome, "Nome da Pessoa".
*/
SELECT name AS "Nome da Pessoa" FROM Employees;

/*
 * Este exemplo atualiza o valor da coluna "salary" na tabela "Employees" 
 * multiplicando o valor existente por 1.1. Neste caso, 
 * o valor do salário do funcionário com ID 1 será aumentado em 10%.
 */
UPDATE Employees
SET salary = salary * 1.1
WHERE id = 1;

