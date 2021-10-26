DROP DATABASE IF EXISTS team_db;
CREATE DATABASE team_db;

USE team_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    dept_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    role_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(dept_id)
    ON DELETE SET NULL
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    emp_id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(role_id)
    ON DELETE CASCADE,
    manager_id INT DEFAULT NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(emp_id)
    ON DELETE SET NULL
);