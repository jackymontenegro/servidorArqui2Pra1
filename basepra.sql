-- MySQL Script generated by MySQL Workbench
-- vie 26 feb 2021 19:24:26
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`tipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tipo` (
  `idtipo` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(15) NULL,
  PRIMARY KEY (`idtipo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  `apellido` VARCHAR(45) NULL,
  `fechaNacimiento` DATE NULL,
  `peso` FLOAT NULL,
  `altura` FLOAT NULL,
  `tipo_idtipo` INT NOT NULL,
  `usuario_idusuario` INT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `contra` VARCHAR(45) NOT NULL,
  `activo` INT(11) NULL DEFAULT 0,
  `status` INT(11) NULL DEFAULT 1,
  `sexo` VARCHAR(4) NULL,
  PRIMARY KEY (`idusuario`),
  INDEX `fk_usuario_tipo1_idx` (`tipo_idtipo` ASC),
  INDEX `fk_usuario_usuario1_idx` (`usuario_idusuario` ASC),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC),
  CONSTRAINT `fk_usuario_tipo1`
    FOREIGN KEY (`tipo_idtipo`)
    REFERENCES `mydb`.`tipo` (`idtipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_usuario1`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `mydb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ritmo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ritmo` (
  `idritmo` INT NOT NULL AUTO_INCREMENT,
  `ritmo` FLOAT NULL,
  `usuario_idusuario` INT NOT NULL,
  `fecha` DATETIME NULL,
  PRIMARY KEY (`idritmo`),
  INDEX `fk_ritmo_usuario_idx` (`usuario_idusuario` ASC),
  CONSTRAINT `fk_ritmo_usuario`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `mydb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`oxigeno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`oxigeno` (
  `idoxigeno` INT NOT NULL AUTO_INCREMENT,
  `oxigeno` FLOAT NULL,
  `usuario_idusuario` INT NOT NULL,
  `fecha` DATETIME NULL,
  PRIMARY KEY (`idoxigeno`),
  INDEX `fk_oxigeno_usuario1_idx` (`usuario_idusuario` ASC),
  CONSTRAINT `fk_oxigeno_usuario1`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `mydb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`temperatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`temperatura` (
  `idtemperatura` INT NOT NULL AUTO_INCREMENT,
  `temperatura` FLOAT NULL,
  `usuario_idusuario` INT NOT NULL,
  `fecha` DATETIME NULL,
  PRIMARY KEY (`idtemperatura`),
  INDEX `fk_temperatura_usuario1_idx` (`usuario_idusuario` ASC),
  CONSTRAINT `fk_temperatura_usuario1`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `mydb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
