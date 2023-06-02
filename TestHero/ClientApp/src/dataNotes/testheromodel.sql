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
  `idGrupo` INT ,
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

insert into profesor (nombres, apellidos, correo, password) values ('Schuyler', 'Cocker', 'scocker0@clickbank.net', 'kQFe2wDjAyhz');
insert into profesor (nombres, apellidos, correo, password) values ('Trista', 'Mandeville', 'tmandeville1@bravesites.com', 'fieoBpun8');
insert into profesor (nombres, apellidos, correo, password) values ('Gayle', 'Duesberry', 'gduesberry2@symantec.com', '9PS6HRj8Rc');
insert into profesor (nombres, apellidos, correo, password) values ('Corabelle', 'Flanaghan', 'cflanaghan3@weather.com', 'wwf3Tcblk7');
insert into profesor (nombres, apellidos, correo, password) values ('Terencio', 'Cicchitello', 'tcicchitello4@icq.com', 'uab3xVc0ghY');
insert into profesor (nombres, apellidos, correo, password) values ('Annora', 'Lugsdin', 'alugsdin5@google.pl', '7JF031Hwd0b');
insert into profesor (nombres, apellidos, correo, password) values ('Dolf', 'Beverstock', 'dbeverstock6@hp.com', 'fIPkpTaP65YA');
insert into profesor (nombres, apellidos, correo, password) values ('Cate', 'Ruprechter', 'cruprechter7@youtu.be', 'LqPWii');
insert into profesor (nombres, apellidos, correo, password) values ('Mina', 'Jaspar', 'mjaspar8@macromedia.com', 'xyDnPiDet0');
insert into profesor (nombres, apellidos, correo, password) values ('Dirk', 'Pursey', 'dpursey9@google.es', 'OFmz9chLt');
insert into profesor (nombres, apellidos, correo, password) values ('Esteban', 'Rodríguez', 'esteban@hotmail.com', 'OFmz9chLa');

insert into grupo (nombre, idProfesor) values ('Mate III', 8);
insert into grupo (nombre, idProfesor) values ('Francés I', 1);
insert into grupo (nombre, idProfesor) values ('Ciencias computacionales', 6);
insert into grupo (nombre, idProfesor) values ('Progra web', 6);
insert into grupo (nombre, idProfesor) values ('Progra de videojuegos', 4);
insert into grupo (nombre, idProfesor) values ('Mate II', 6);
insert into grupo (nombre, idProfesor) values ('Robótica', 9);
insert into grupo (nombre, idProfesor) values ('Inglés I', 7);
insert into grupo (nombre, idProfesor) values ('Química', 5);
insert into grupo (nombre, idProfesor) values ('Fisica', 3);
insert into grupo (nombre, idProfesor) values ('Mate I', 11);

insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Zsazsa', 'Warret', 'zwarret0@google.nl', '6YsO8xqf38Z', 7);
insert into alumno (nombres, apellidos,  correo, password, idGrupo) values ('Brendon', 'Dearness',  'bdearness1@digg.com', '4jXbOAu5', 2);
insert into alumno (nombres, apellidos,  correo, password, idGrupo) values ('Janeczka', 'Skeleton', 'jskeleton2@statcounter.com', 'TSKalUX2BMK', 8);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Blythe', 'Bassano', 'bbassano3@nytimes.com', 'JK2mAvb9GHE', 7);
insert into alumno (nombres, apellidos,  correo, password, idGrupo) values ('Benedicto', 'Arlt', 'barlt4@wisc.edu', 'dbXJci4YR', 5);
insert into alumno (nombres, apellidos,  correo, password, idGrupo) values ('Leeland', 'Eyam', 'leyam5@parallels.com', 'EvfdlEcS', 6);
insert into alumno (nombres, apellidos,  correo, password, idGrupo) values ('Wallas', 'Pillington',  'wpillington6@samsung.com', 'j9ZUxqQ0eL', 2);
insert into alumno (nombres, apellidos,  correo, password, idGrupo) values ('Holly', 'Dugan', 'hdugan7@mozilla.org', 'AvBwqx8zO', 2);
insert into alumno (nombres, apellidos,  correo, password, idGrupo) values ('Herschel', 'Tabourin',  'htabourin8@arstechnica.com', 'paCZfam5r', 9);
insert into alumno (nombres, apellidos,  correo, password, idGrupo) values ('Sheffy', 'Collinge',  'scollinge9@oakley.com', 'PijATpClEDf', 9);

INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('EXAM123A', 'Examen de Matemáticas', 'Matemáticas', '2023-06-01 09:00:00', '2023-06-01 11:00:00', 5);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('EXAM456B', 'Examen de Historia', 'Historia', '2023-06-02 10:00:00', '2023-06-02 12:00:00', 3);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('EXAM789C', 'Examen de Biología', 'Biología', '2023-06-03 08:00:00', '2023-06-03 10:00:00', 7);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('EXAMABC1', 'Examen de Física', 'Física', '2023-06-04 11:00:00', '2023-06-04 13:00:00', 2);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('EXAMDEF2', 'Examen de Literatura', 'Literatura', '2023-06-05 09:00:00', '2023-06-05 11:00:00', 10);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('EXAMGHI3', 'Examen de Química', 'Química', '2023-06-06 10:00:00', '2023-06-06 12:00:00', 8);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('EXAMJKL4', 'Examen de Geografía', 'Geografía', '2023-06-07 08:00:00', '2023-06-07 10:00:00', 6);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('EXAMMNO5', 'Examen de Informática', 'Informática', '2023-06-08 11:00:00', '2023-06-08 13:00:00', 9);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('EXAMPQR6', 'Examen de Inglés', 'Inglés', '2023-06-09 09:00:00', '2023-06-09 11:00:00', 4);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('EXAMSTU7', 'Examen de Español', 'Español', '2023-06-10 10:00:00', '2023-06-10 12:00', 5);

INSERT INTO poder (nombre) VALUES ('Rayo de Hielo');
INSERT INTO poder (nombre) VALUES ('Invisibilidad');
INSERT INTO poder (nombre) VALUES ('Fuerza Sobrehumana');
INSERT INTO poder (nombre) VALUES ('Teletransportación');
INSERT INTO poder (nombre) VALUES ('Control del Fuego');

INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál es el proceso de fotosíntesis?', 1);
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál es el gas más encontrado en la atmósfera?', 1);
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué son los ácidos y las bases?', 2);
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es la mitosis?', 3);
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué son los fenómenos ondulatorios?', 4);
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cómo se puede reducir la huella de carbono?', 5);
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es la energía solar?', 6);
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué son los circuitos eléctricos?', 7);
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cómo se puede prevenir la contaminación del aire?', 8);
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es la teoría de la evolución de Darwin?', 9);
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué son las células?', 10);

INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La fotosíntesis es el proceso por el cual las plantas convierten la energía solar en energía química para su crecimiento y desarrollo.', 1, 1);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Los ácidos son sustancias que liberan iones de hidrógeno (H+) en solución, mientras que las bases son sustancias que liberan iones de hidróxido (OH-) en solución.', 1, 2);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La mitosis es el proceso de división celular que produce dos células hijas genéticamente idénticas a la célula madre.', 1, 3);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Los fenómenos ondulatorios son aquellos que implican la propagación de una onda, como el sonido, la luz y las ondas en el agua.', 1, 4);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La fotosíntesis es el proceso por el cual las plantas convierten la energía química en energía solar para su crecimiento y desarrollo.', 0, 1);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Los ácidos son sustancias que liberan iones de hidróxido (OH-) en solución, mientras que las bases son sustancias que liberan iones de hidrógeno (H+) en solución.', 0, 2);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La mitosis es el proceso de división celular que produce una célula hija genéticamente idéntica a la célula madre.', 0, 3);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Los fenómenos ondulatorios son aquellos que implican la propagación de una partícula, como el sonido, la luz y las ondas en el agua.', 0, 4);

INSERT INTO etiqueta (nombre) VALUES ('Trigonometría');
INSERT INTO etiqueta (nombre) VALUES ('Ecuaciones');
INSERT INTO etiqueta (nombre) VALUES ('Revolución');
INSERT INTO etiqueta (nombre) VALUES ('Geometría');
INSERT INTO etiqueta (nombre) VALUES ('Álgebra');
INSERT INTO etiqueta (nombre) VALUES ('Cálculo');
INSERT INTO etiqueta (nombre) VALUES ('Historia');
INSERT INTO etiqueta (nombre) VALUES ('Ciencias');
INSERT INTO etiqueta (nombre) VALUES ('Literatura');
INSERT INTO etiqueta (nombre) VALUES ('Arte');

insert into examenetiqueta (idExamen, idEtiqueta) values (6, 2);
insert into examenetiqueta (idExamen, idEtiqueta) values (2, 8);
insert into examenetiqueta (idExamen, idEtiqueta) values (2, 5);
insert into examenetiqueta (idExamen, idEtiqueta) values (5, 10);
insert into examenetiqueta (idExamen, idEtiqueta) values (9, 6);
insert into examenetiqueta (idExamen, idEtiqueta) values (2, 10);
insert into examenetiqueta (idExamen, idEtiqueta) values (9, 10);
insert into examenetiqueta (idExamen, idEtiqueta) values (6, 7);
insert into examenetiqueta (idExamen, idEtiqueta) values (9, 3);
insert into examenetiqueta (idExamen, idEtiqueta) values (5, 4);

insert into examenpoder (idExamen, idPoder) values (9, 5);
insert into examenpoder (idExamen, idPoder) values (9, 2);
insert into examenpoder (idExamen, idPoder) values (8, 5);
insert into examenpoder (idExamen, idPoder) values (2, 4);
insert into examenpoder (idExamen, idPoder) values (10, 5);
insert into examenpoder (idExamen, idPoder) values (7, 2);
insert into examenpoder (idExamen, idPoder) values (10, 4);
insert into examenpoder (idExamen, idPoder) values (1, 1);
insert into examenpoder (idExamen, idPoder) values (7, 4);
insert into examenpoder (idExamen, idPoder) values (6, 4);

/*
insert into alumnopregunta (idAlumno, idPregunta, idRespuesta) values (7, 3, 1);
insert into alumnopregunta (idAlumno, idPregunta, idRespuesta) values (2, 1, 0);
insert into alumnopregunta (idAlumno, idPregunta, idRespuesta) values (6, 9, 0);
insert into alumnopregunta (idAlumno, idPregunta, esCorrecta) values (6, 8, 0);
insert into alumnopregunta (idAlumno, idPregunta, esCorrecta) values (10, 1, 0);
insert into alumnopregunta (idAlumno, idPregunta, esCorrecta) values (7, 4, 1);
insert into alumnopregunta (idAlumno, idPregunta, esCorrecta) values (1, 9, 1);
insert into alumnopregunta (idAlumno, idPregunta, esCorrecta) values (4, 9, 0);
insert into alumnopregunta (idAlumno, idPregunta, esCorrecta) values (7, 1, 0);
insert into alumnopregunta (idAlumno, idPregunta, esCorrecta) values (2, 2, 1);
*/

insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (4, 1, 0, 65052, '2023-04-25');
insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (8, 8, 8, 15325, '2022-05-16');
insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (10, 4, 1, 197656, '2023-02-15');
insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (6, 10, 4, 138110, '2022-09-04');
insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (8, 9, 10, 27284, '2023-01-03');
insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (1, 7, 10, 96335, '2022-10-05');
insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (8, 7, 4, 35112, '2022-10-04');
insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (2, 7, 3, 143449, '2022-07-01');
insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (9, 2, 5, 152276, '2022-09-23');
insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (3, 1, 0, 16382, '2023-04-14');
insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (1, 5, 8, 16382, '2023-05-20');
insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (3, 9, 7, 16382, '2023-05-22');
insert into alumnoexamen (idAlumno, idExamen, calificacion, puntos, fechaRealizacion) values (4, 10, 10, 16382, '2023-05-20');

use testhero;
