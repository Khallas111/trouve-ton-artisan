CREATE DATABASE IF NOT EXISTS `trouve_ton_artisan`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `trouve_ton_artisan`;

CREATE TABLE IF NOT EXISTS `Categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Artisans` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `specialty` VARCHAR(255) DEFAULT NULL,
  `rating` FLOAT DEFAULT NULL,
  `city` VARCHAR(255) DEFAULT NULL,
  `about` TEXT,
  `email` VARCHAR(255) DEFAULT NULL,
  `website` VARCHAR(255) DEFAULT NULL,
  `top` TINYINT(1) NOT NULL DEFAULT 0,
  `categoryId` INT DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_artisans_category_id` (`categoryId`),
  CONSTRAINT `fk_artisans_category_id`
    FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
