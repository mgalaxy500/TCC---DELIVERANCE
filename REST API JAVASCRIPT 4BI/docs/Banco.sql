--Código do Banco de dados, usar de referência para mudar as variáveis. 

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema BancoTCC
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema BancoTCC
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BancoTCC` DEFAULT CHARACTER SET utf8 ;
USE `BancoTCC` ;

-- -----------------------------------------------------
-- Table `BancoTCC`.`aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BancoTCC`.`aluno` (
  `idAluno` INT UNSIGNED NOT NULL,
  `nomeAluno` VARCHAR(64) NOT NULL,
  `turmaAluno` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAluno`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BancoTCC`.`professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BancoTCC`.`professor` (
  `idProfessor` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nomeProfessor` VARCHAR(64) NOT NULL,
  `disciplinaProfessor` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`idProfessor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BancoTCC`.`disciplina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BancoTCC`.`disciplina` (
  `idDisciplina` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nomeDisciplina` VARCHAR(45) NOT NULL,
  `turma` VARCHAR(45) NOT NULL,
  `professor_idProfessor` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idDisciplina`),
  INDEX `fk_Disciplina_professores1_idx` (`professor_idProfessor` ASC),
  CONSTRAINT `fk_Disciplina_professores1`
    FOREIGN KEY (`professor_idProfessor`)
    REFERENCES `BancoTCC`.`professor` (`idProfessor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BancoTCC`.`provaSub`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BancoTCC`.`provaSub` (
  `idProvaSub` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `disciplina_idDisciplina` INT UNSIGNED NOT NULL,
  `aluno_idAluno` INT UNSIGNED NOT NULL,
  `dataProva` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idProvaSub`),
  INDEX `fk_provasSubstitutivas_Disciplina1_idx` (`disciplina_idDisciplina` ASC),
  INDEX `fk_provasSubstitutivas_alunos1_idx` (`aluno_idAluno` ASC),
  CONSTRAINT `fk_provasSubstitutivas_Disciplina1`
    FOREIGN KEY (`disciplina_idDisciplina`)
    REFERENCES `BancoTCC`.`disciplina` (`idDisciplina`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_provasSubstitutivas_alunos1`
    FOREIGN KEY (`aluno_idAluno`)
    REFERENCES `BancoTCC`.`aluno` (`idAluno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BancoTCC`.`requisicao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BancoTCC`.`requisicao` (
  `idRequisicao` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tipoRequisicao` VARCHAR(45) NOT NULL,
  `dataRequisicao` DATETIME NOT NULL,
  `comprovante` BLOB NOT NULL,
  `aluno_idAluno` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idRequisicao`),
  INDEX `fk_requisicao_alunos1_idx` (`aluno_idAluno` ASC),
  CONSTRAINT `fk_requisicao_alunos1`
    FOREIGN KEY (`aluno_idAluno`)
    REFERENCES `BancoTCC`.`aluno` (`idAluno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BancoTCC`.`chamada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BancoTCC`.`chamada` (
  `idChamada` INT NOT NULL,
  `dataChamada` DATETIME NOT NULL,
  `provaSubstitutivasChamada` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idChamada`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BancoTCC`.`funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BancoTCC`.`funcionario` (
  `idFuncionario` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `senhaFuncionario` VARCHAR(45) NOT NULL,
  `emailFuncionario` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idFuncionario`),
  UNIQUE INDEX `emailFuncionario_UNIQUE` (`emailFuncionario` ASC),
  UNIQUE INDEX `senhaFuncionario_UNIQUE` (`senhaFuncionario` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
