DROP DATABASE IF EXISTS `mytestauthdb`;
CREATE DATABASE IF NOT EXISTS `mytestauthdb`;

USE `mytestauthdb`;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('customer', 'admin') NOT NULL
);

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);


CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Dummy data
INSERT INTO products (name, price)
VALUES
  ('Product 1', 10.99),
  ('Product 2', 19.99),
  ('Product 3', 7.99);
