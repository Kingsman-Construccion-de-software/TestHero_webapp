DROP DATABASE IF EXISTS testhero;
CREATE DATABASE IF NOT EXISTS testhero DEFAULT CHARACTER SET utf8;

USE testhero;

-- -----------------------------------------------------
-- Table `Profesor`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Profesor (
  `idProfesor` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombres` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(45) NOT NULL
);

-- -----------------------------------------------------
-- Table `Grupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Grupo (
  `idGrupo` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(45) NOT NULL,
  `idProfesor` INT NOT NULL,
   FOREIGN KEY(`idProfesor`) REFERENCES `Profesor`(`idProfesor`)
   ON DELETE NO ACTION
   ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `Alumno`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Alumno (
  `idAlumno` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombres` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(45) NOT NULL,
  `idGrupo` INT,
  `tickets` int default 0,
  FOREIGN KEY(`idGrupo`) REFERENCES `Grupo`(`idGrupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `Examen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Examen (
  `idExamen` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `codigo` VARCHAR(8) NOT NULL UNIQUE,
  `fechaInicio` DATETIME NOT NULL,
  `fechaFin` DATETIME NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `materia` VARCHAR(45) NOT NULL,
  `idGrupo` INT NOT NULL,
   FOREIGN KEY(`idGrupo`) REFERENCES `Grupo`(`idGrupo`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);
-- -----------------------------------------------------
-- Table `AlumnoExamen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS AlumnoExamen (
  `idAlumno` INT NOT NULL,
  `idExamen` INT NOT NULL,
  `calificacion` INT NULL,
  `puntos` INT NULL,
  `fechaRealizacion` DATETIME NULL,
  PRIMARY KEY (`idAlumno`, `idExamen`),
  FOREIGN KEY(`idAlumno`) REFERENCES `Alumno`(`idAlumno`)
   ON DELETE NO ACTION
   ON UPDATE NO ACTION,
  FOREIGN KEY(`idExamen`) REFERENCES `Examen`(`idExamen`)
   ON DELETE NO ACTION
   ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `Etiqueta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Etiqueta (
  `idEtiqueta` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(45) NULL UNIQUE
);


-- -----------------------------------------------------
-- Table `Pregunta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Pregunta (
  `idPregunta` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `pregunta` TEXT NOT NULL,
  `idExamen` INT NOT NULL,
  `idEtiqueta` Int,
  FOREIGN KEY (`idExamen`) REFERENCES `Examen` (`idExamen`),
  foreign key (`idEtiqueta`) references `Etiqueta` (`idEtiqueta`)
);

-- -----------------------------------------------------
-- Table `Respuesta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Respuesta (
  `idRespuesta` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `respuesta` TEXT NULL,
  `esCorrecta` TINYINT NULL,
  `idPregunta` INT NOT NULL,
  FOREIGN KEY (`idPregunta`) REFERENCES `Pregunta` (`idPregunta`)
);

-- -----------------------------------------------------
-- Table `Poder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Poder (
  `idPoder` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(45) NULL UNIQUE
);

-- -----------------------------------------------------
-- Table `ExamenPoder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ExamenPoder (
  `idExamen` INT NOT NULL,
  `idPoder` INT NOT NULL,
   PRIMARY KEY (`idExamen`, `idPoder`),
   FOREIGN KEY (`idExamen`) REFERENCES `Examen` (`idExamen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
   FOREIGN KEY (`idPoder`) REFERENCES `Poder` (`idPoder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table `ExamenEtiquetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ExamenEtiqueta (
  `idExamen` INT NOT NULL,
  `idEtiqueta` INT NOT NULL,
  PRIMARY KEY (`idExamen`, `idEtiqueta`),
  FOREIGN KEY(`idExamen`) REFERENCES `Examen`(`idExamen`)
	ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY(`idEtiqueta`) REFERENCES `Etiqueta`(`idEtiqueta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `AlumnoPregunta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS AlumnoPregunta (
  `idAlumno` INT NOT NULL,
  `idPregunta` INT NOT NULL,
  `idRespuesta` INT,
  PRIMARY KEY (`idAlumno`, `idPregunta`),
  FOREIGN KEY(`idAlumno`) REFERENCES `Alumno`(`idAlumno`)
	ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY(`idPregunta`) REFERENCES `Pregunta`(`idPregunta`)
	ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `AlumnoPoder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS AlumnoPoder (
  `idAlumno` INT NOT NULL,
  `idPoder` INT NOT NULL,
  `Cantidad` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idAlumno`, `idPoder`),
  FOREIGN KEY(`idAlumno`) REFERENCES `Alumno`(`idAlumno`)
	ON DELETE NO ACTION
    
    
    ON UPDATE NO ACTION,
  FOREIGN KEY(`idPoder`) REFERENCES `Poder`(`idPoder`)
	ON DELETE CASCADE
    ON UPDATE NO ACTION
);

