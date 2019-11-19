DROP DATABASE IF EXISTS LaterListdb;
CREATE DATABASE LaterListdb;

USE DATABASE LaterListdb;

CREATE TABLE users(
id INT AUTO_INCREMENT,
   first_name VARCHAR(100),
   last_name VARCHAR(100),
   email VARCHAR(50),
   password VARCHAR(20),
   register_date DATETIME,
   PRIMARY KEY(id)
);



