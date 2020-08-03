DROP DATABASE IF EXISTS employee_trackerdb;
CREATE DATABASE employee_trackerdb;
USE employee_trackerdb;

CREATE TABLE department (
id INT NOT NULL auto_increment,
dept_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee_role (
id INT NOT NULL auto_increment,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10, 2) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id)

);

CREATE TABLE employee_info (
id INT NOT NULL auto_increment,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY (id)
);

INSERT INTO department (dept_name) 
VALUES 
('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO employee_role (title, salary, department_id) 
VALUES 
(('Manager'), ('100000'), ('001')), 
(('Engineer'), ('90000'), ('002')), 
(('Accountant'), ('70000'), ('003')), 
(('Lawyer'), ('90000'), ('004')) ;

INSERT INTO employee_info (first_name, last_name, role_id, manager_id) 
VALUES 
(('Frank'), ('Crowley'), ('11'), ('10')), 
(('James'), ('Boone'), ('12'), ('10')), 
(('Aaron'), ('Sullivan'), ('13'), ('10')), 
(('Bryan'), ('Virgil'), ('14'), ('10'));