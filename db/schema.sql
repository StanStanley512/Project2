DROP DATABASE IF EXISTS LaterListdb;
CREATE DATABASE LaterListdb;

USE DATABASE LaterListdb;

CREATE TABLE users(
id INT AUTO_INCREMENT,
   email VARCHAR(50),
   password VARCHAR(20),
   register_date DATETIME,
   PRIMARY KEY(id)
);

CREATE TABLE items (
  id int(11) NOT NULL AUTO_INCREMENT,
  category varchar(255) NOT NULL,
  title varchar(255) NOT NULL,
  itemId varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  UserId int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



