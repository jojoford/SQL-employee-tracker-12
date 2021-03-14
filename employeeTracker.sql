
DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

--Dept TABLE
CREATE TABLE department (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,

name VARCHAR(30) NOT NULL

);


INSERT INTO department (name)
VALUES ("Sales"), ("Finance"), ("Engineering"), ("Legal");


-- Role table
CREATE TABLE role (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,

title VARCHAR(30) NOT NULL,
salary DECIMAL(10) NOT NULL,

department_id INT,

FOREIGN KEY (department_id) REFERENCES department(id)
);

--Role values
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Team Lead", 100000,1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 50000,1);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 80000,2);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Finance Manager", 120000,2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000,3);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 100000,3);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 150000,4);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Aide", 50000,4);

--Employee table
CREATE TABLE employee (
 id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,

 first_name VARCHAR(30) NOT NULL,
 last_name VARCHAR(30) NOT NULL,
 
 role_id INT NULL,
 manager_id INT NULL,


FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)

);

--Employee values
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith",1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jessica", "Parker",2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott",3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwight", "Schrute",4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Pam", "Beesly",5, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Malone",6, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Angela", "Martin",7, NULL);

--Updating the manager for specific employees
UPDATE employee SET manager_id = 1 WHERE id = 5;
UPDATE employee SET manager_id = 1 WHERE id = 4;
UPDATE employee SET manager_id = 1 WHERE id = 3;
 
