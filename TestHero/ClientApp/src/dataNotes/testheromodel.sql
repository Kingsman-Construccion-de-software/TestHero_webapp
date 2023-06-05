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

-- Datos consistentes

-- Profesor (1 cuenta)
insert into profesor (nombres, apellidos, correo, password) values ('Ernesto', 'Cruz', 'ecruz@gmail.com', 'neto1234');

-- Grupo (alumnos)
insert into grupo (nombre, idProfesor) values ('Introducción a Biología', 1);

-- Alumno (5 cuentas)
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Rosa', 'Casio', 'rcasio@hotmail.com', '123rosaca', 1);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Joaquin', 'Rodríguez', 'joaquinrdz@gmail.com', 'j04qu1n', 1);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Rafael', 'Urbina', 'rafiqui@gmail.com', 'rafix777', 1);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Daniel', 'González', 'dgonzalez@udem.edu', '07DaniBoi07', 1);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Nicolás', 'Cajas', 'nickcage@gmail.com', 'zSoyNico03z', 1);


-- Examen (5)
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('BIOEXA01', 'Examen de Tópicos', 'BiologíaI', '2023-06-01 09:00:00', '2023-06-30 11:00:00', 1);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('BIOEXA02', 'Examen de Tópicos (Segundo Periodo)', 'BiologíaII', '2023-06-01 09:00:00', '2023-06-30 11:00:00', 1);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('BIOEXA03', 'Examen Mediotermino', 'BiologíaIII', '2023-06-01 09:00:00', '2023-06-30 11:00:00', 1);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('BIOEXA04', 'Examen de Tópicos (Tercer Periodo)', 'BiologíaIIIV', '2023-06-01 09:00:00', '2023-06-30 11:00:00', 1);
INSERT INTO Examen (codigo, nombre, materia, fechaInicio, fechaFin, idGrupo) VALUES ('BIOEXA05', 'Examen Final', 'BiologíaV', '2023-06-01 09:00:00', '2023-06-30 11:00:00', 1);

-- Preguntas (1.1)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es una célula?', 1);
-- Respuestas (1.1)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Una célula es la unidad básica de la vida.', 1, 1);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La casa de poderde algo', 0, 1);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Lo que se encuentra dentro de un ojo', 0, 1);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Ninguna de las anteriores', 0, 1);
-- Preguntas (1.2)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es la teoría celular?', 1);
-- Respuestas (1.2)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Todo tiene células', 0, 2);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Todos los organismos vivos están constituidos por células', 1, 2);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Las células existen', 0, 2);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Todas las anteriores', 0, 2);
-- Preguntas (1.3)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuáles son las excepciones a la teoría celular?', 1);
-- Respuestas (1.3)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Las discrepancias', 0, 3);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Los corchos con células', 1, 3);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Los organismos unicelulares', 1, 3);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Los organismos multicelulares', 0, 3);
-- Preguntas (1.4)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué son los organismos unicelulares?', 1);
-- Respuestas (1.4)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Organismos compuestos por una o más células', 0, 4);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Estructura compleja de una célula', 0, 4);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Existe en el citoplasma', 0, 4);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Organismos que constan de una única célula', 1, 4);
-- Preguntas (1.5)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Que puede probar la teoría celular?', 1);
-- Respuestas (1.5)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El músculo estriado', 0, 5);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Los hongos con hifas', 0, 5);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Las algas que se alimentan por fotosíntesis', 0, 5);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Todas las anteriores', 1, 5);
-- Preguntas (1.6)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuáles no es parte de las funciones vitales en un organismo?', 1);
-- Respuestas (1.6)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La Nutrición', 0, 6);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El Metabolismo', 0, 6);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El ejercicio', 1, 6);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La excreción', 0, 6);
-- Preguntas (1.7)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es verdad en las limitaciones del tamaño celular?', 1);
-- Respuestas (1.7)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La tasa metabólica es proporcional al volúmen de la célula', 1, 7);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Entre más células tenga, más metabolismo', 0, 7);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Ningúna de las anteriores', 0, 7);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Entre más células tenga, menor metabolismo', 0, 7);
-- Preguntas (1.8)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué son las células madre?', 1);
-- Respuestas (1.8)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Células con la capacidad de diferenciarse como sea necesario', 1, 8);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La madre de las células', 0, 8);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Aquellas que pueden dividirse varias veces', 0, 8);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Ninguna de las anteriores', 0, 8);
-- Preguntas (1.9)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál de las siguientes provee la energía a las células?', 1);
-- Respuestas (1.9)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El núcleo', 0, 9);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El retículo endoplasmático rugoso', 0, 9);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La Lisosoma', 0, 9);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La Mitocondria', 1, 9);
-- Preguntas (1.10)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué son las membranas celulares?', 1);
-- Respuestas (1.10)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Lo que recubre la célula', 1, 10);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('En donde se encuentran los organelos', 0, 10);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Lo que mantiene el ADN celular', 0, 10);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Lo que recubre células de plantas', 0, 10);
-- Preguntas (2.11)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es la Biología Molecular?', 2);
-- Respuestas (2.11)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La Biología que estudia las moleculas', 0, 11);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Estudio que explica procesos vivos con sustancias químicas', 1, 11);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El estudio de las moleculas', 0, 11);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Ninguna de las anteriores', 0, 11);
-- Preguntas (2.12)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿A qué se le conoce como Compuestos de Carbono?', 2);
-- Respuestas (2.12)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Moleculas compuestas de carbón', 0, 12);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Los lípidos, glúcidos, las proteínas y los ácidos nucléicos', 0, 12);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Moleculas capaces de formar cuatro enlaces entre ellos', 1, 12);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Ninguna de las anteriores', 0, 12);
-- Preguntas (2.13)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es el metabolismo?', 2);
-- Respuestas (2.13)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El conjunto de todas las reacciones catalizadas por enzimas', 1, 13);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El hecho de quemar grasa', 0, 13);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Un artículo vendido por facebook', 0, 13);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Reacciones que ocurren dentro del cuerpo', 0, 13);
-- Preguntas (2.14)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es el Anabolismo?', 2);
-- Respuestas (2.14)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El antónimo del metabolismo', 0, 14);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El hecho de crear grasa', 0, 14);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La síntesis de moléculas complejas a partir de simples', 1, 14);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Ninguna de las anteriores', 0, 14);
-- Preguntas (2.15)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué son los puentes de hidrógeno?', 2);
-- Respuestas (2.15)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Puentes de agua', 0, 15);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Puentes que se crean solamente con moléculas de agua', 0, 15);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Un tipo de enlace entre agua', 0, 15);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La atracción entre las moléculas de agua', 1, 15);
-- Preguntas (2.16)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuáles no son las propiedades del agua?', 2);
-- Respuestas (2.16)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Propiedades adhesivas', 0, 16);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Propiedades de fluído', 1, 16);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Propiedades térmicas', 0, 16);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Propiedades disolventes', 0, 16);
-- Preguntas (2.17)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuáles de las siguientes son las propiedades térmicas del agua?', 2);
-- Respuestas (2.17)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Todas las anteriores', 1, 17);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Elevado calor específico', 0, 17);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Elevado calor latente de vaporización', 0, 17);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Elevado punto de ebullición', 1, 17);
-- Preguntas (2.18)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuáles son las diferencias entre el agua y el metano?', 2);
-- Respuestas (2.18)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Son pequeñas moléculas', 0, 18);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Todas las anteriores', 1, 18);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Tienen enlaces covalentes simples', 0, 18);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Tienen impacto en los gases de efecto invernadero', 0, 18);
-- Preguntas (2.19)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué son las proteínas?', 2);
-- Respuestas (2.19)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Conjunto de uno o varios polipéptidos', 1, 19);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Las que se toman para el gimnasio', 0, 19);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Las que están en los músculos', 0, 19);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Ninguna de las anteriores', 0, 19);
-- Preguntas (2.20)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuáles no son funciones de las proteínas?', 2);
-- Respuestas (2.20)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Crear Músculos', 1, 20);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Catálisis', 0, 20);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La contracción muscular', 0, 20);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Adhesión celular', 0, 20);
-- Preguntas (3.21)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es un gen?', 3);
-- Respuestas (2.21)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('ADN solo', 0, 21);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Un tipo de información', 0, 21);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Ninguna de las anteriores', 0, 21);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Factor hereeditario con ADN', 1, 21);
-- Preguntas (3.22)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Dónde se encuentran los genes?', 3);
-- Respuestas (2.22)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('En cromosomas', 1, 22);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('En el ADN', 0, 22);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('En los organismos', 0, 22);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('En el núcleo', 0, 22);
-- Preguntas (3.23)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué son los alelos?', 3);
-- Respuestas (2.23)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Un tipo de Gen', 0, 23);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Distintas formas especificas de un gen', 1, 23);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Ninguna de las anteriores', 0, 23);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El locus de un gen', 0, 23);
-- Preguntas (3.24)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es la mutación?', 3);
-- Respuestas (2.24)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Lo que creó a los X-Men', 0, 24);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Cambios que suceden artificialmente', 0, 24);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Todas las anteriores', 0, 24);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Cambios aleatorios formados por nuevos alelos', 1, 24);
-- Preguntas (3.25)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es un genoma?', 3);
-- Respuestas (2.25)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La totalidad de la información genética', 1, 25);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Sinínimo de ADN', 0, 25);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Parte de un gen', 0, 25);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Información dentro de organismos', 0, 25);
-- Preguntas (3.26)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿De cuántes moleculas consta el genoma humano que forman los cromosomas?', 3);
-- Respuestas (2.26)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('45', 0, 26);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('56', 0, 26);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('47', 0, 26);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('46', 1, 26);
-- Preguntas (3.27)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál es el nombre del gen que codifica un receptor de dopamina?', 3);
-- Respuestas (2.27)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('CFTR', 0, 27);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('DRD4', 1, 27);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('HBB', 0, 27);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('F8', 0, 27);
-- Preguntas (3.28)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál es el nombre del gen que codifica un una proteina del canal de cloruro?', 3);
-- Respuestas (2.28)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('CFTR', 1, 28);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('DRD4', 0, 28);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('HBB', 0, 28);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('F8', 0, 28);
-- Preguntas (3.29)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál es el número de cromosomas que contienen los perros?', 3);
-- Respuestas (2.29)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('8', 0, 29);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('78', 1, 29);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('56', 0, 29);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('38', 0, 29);
-- Preguntas (3.30)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál es una descripción válida para los cromosomas X?', 3);
-- Respuestas (3.30)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Son grandes', 0, 30);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Tienen el centrómero cerca de la mitad', 1, 30);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Todas las anteriores', 1, 30);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Son asociados con el sexo masculino', 0, 30);
-- Preguntas (4.31)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Que requieren los ecosistemas?', 4);
-- Respuestas (4.31)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Un suministro continuo de agua', 0, 31);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Un suministro continuo de energía', 1, 31);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Un suministro continuo de luz', 0, 31);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Un suministro continuo de calor', 0, 31);
-- Preguntas (4.32)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué son las especies?', 4);
-- Respuestas (4.32)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Un tipo de organismo específico', 0, 32);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Organismos que no se pueden reproducir entre sí', 0, 32);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Organismos que se pueden reproducir entre sí', 1, 32);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Todas las anteriores', 0, 32);
-- Preguntas (4.33)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué son las poblaciones?', 4);
-- Respuestas (4.33)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Grupo de organismos de la misma especie en una zona', 1, 33);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El público que una problemática busca atender', 0, 33);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Un lugar donde se vive', 0, 33);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('En donde existe la gente', 0, 33);
-- Preguntas (4.34)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál de los siguientes tiene un metabolismo combinado?', 4);
-- Respuestas (4.34)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Autótrofos', 0, 34);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Mixotrofos', 1, 34);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Heterotróficos', 0, 34);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Omnivoros', 0, 34);
-- Preguntas (4.35)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál de los siguiente es un consumidor?', 4);
-- Respuestas (4.35)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Planta', 0, 35);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Hongo', 0, 35);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Cactus', 0, 35);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Ratón', 1, 35);
-- Preguntas (4.36)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál de los siguiente es un Detritívoro?', 4);
-- Respuestas (4.36)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Tigre', 0, 36);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Hongo', 0, 36);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Planta', 0, 36);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Larvas', 1, 36);
-- Preguntas (4.37)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál de los siguiente es un Saprotrofo?', 4);
-- Respuestas (4.37)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Mapache', 0, 37);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Larva', 0, 37);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Planta', 0, 37);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Hongo', 1, 37);
-- Preguntas (4.38)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál es una conversión posible de la energía lumínica?', 4);
-- Respuestas (4.38)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Energía química de fotosíntesis', 1, 38);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Energía cinética en contracción muscular', 0, 38);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Energía eléctrica en células nerviosas', 0, 38);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Energía térmica en el tejido adiposo que genera calor', 0, 38);
-- Preguntas (4.39)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cómo se forma la turba?', 4);
-- Respuestas (4.39)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Sola', 0, 39);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Cuando la materio orgánica no se descompone del todo', 1, 39);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Con condiciones aeróbicas', 0, 39);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Dejando reposar la tierra un rato', 0, 39);
-- Preguntas (4.40)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cómo ocurre la combustión?', 4);
-- Respuestas (4.40)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('En combinación de gas y fuego', 0, 40);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('En combinación de agua y fuego', 0, 40);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('En combinación de agua y rubidio', 0, 40);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Ninguna de las anteriores', 1, 40);
-- Preguntas (5.41)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál es la función del páncreas?', 5);
-- Respuestas (5.41)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Digerir', 0, 41);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Causar dolor', 0, 41);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Secretar lipasa, amilasa y proteasa', 1, 41);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Secretar bilis', 0, 41);
-- Preguntas (5.42)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál de las siguientes no forma parte de la pared del intestino delgado?', 5);
-- Respuestas (5.42)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Piel', 1, 42);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Serosa', 0, 42);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Capas musculares', 0, 42);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Mucosa', 0, 42);
-- Preguntas (5.43)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál de las siguientes no forma parte de la pared arterial?', 5);
-- Respuestas (5.43)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Túnica externa', 0, 43);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Túnica interna', 1, 43);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Túnica media', 0, 43);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Túnica íntima', 0, 43);
-- Preguntas (5.44)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Cuál de los siguientes son vasos sanguíneos?', 5);
-- Respuestas (5.44)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Todas las opciones', 1, 44);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Arterias', 0, 44);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Venas', 0, 44);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Capilares', 0, 44);
-- Preguntas (5.45)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es el nódulo sinoauricular?', 5);
-- Respuestas (5.45)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Una zona del corazón', 0, 45);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('La zona migénica', 0, 45);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El iniciador de cada latido del corazón', 1, 45);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El nodo que junta los ventrículos', 0, 45);
-- Preguntas (5.46)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Célula encargada de ingerir patógenos?', 5);
-- Respuestas (5.46)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Fagocitos', 1, 46);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Lisosoma', 0, 46);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Glóbulos rojos', 0, 46);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Linfocitos', 0, 46);
-- Preguntas (5.47)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Célula alveolar extremadamente fina y adaptada para el intercambio de gases?', 5);
-- Respuestas (5.47)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Piel', 0, 47);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Neumocito Tipo I', 1, 47);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Neumocito Tipo II', 0, 47);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Bronquiolos', 0, 47);
-- Preguntas (5.48)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Célula alveolar que segrega solución con surfactantes para reducir la tensión superficial?', 5);
-- Respuestas (5.48)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Piel', 0, 48);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Neumocito Tipo I', 0, 48);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Neumocito Tipo II', 1, 48);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Bronquiolos', 0, 48);
-- Preguntas (5.49)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿En la Inspiracióon, que hace la caja torácica?', 5);
-- Respuestas (5.49)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Se mueve hacia arriba y hacia afuera', 1, 49);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Se mueve hacia abajo y se aplana', 0, 49);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Se mueve hacia arriba y adquiere una forma más abombada', 0, 49);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Se mueve hacia abajo y hacia adentro', 0, 49);
-- Preguntas (5.50)
INSERT INTO pregunta (pregunta, idExamen) VALUES ('¿Qué es la Sinapsis?', 5);
-- Respuestas (5.50)
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Un impulso nervioso', 0, 50);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Un conjunto de neuronas', 0, 50);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('El resumen de un escrito', 0, 50);
INSERT INTO respuesta (respuesta, esCorrecta, idPregunta) VALUES ('Las uniones entre neurona y neurona', 1, 50);

-- otros datos

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
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Brendon', 'Dearness', 'bdearness1@digg.com', '4jXbOAu5', 2);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Janeczka', 'Skeleton', 'jskeleton2@statcounter.com', 'TSKalUX2BMK', 8);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Blythe', 'Bassano', 'bbassano3@nytimes.com', 'JK2mAvb9GHE', 7);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Benedicto', 'Arlt', 'barlt4@wisc.edu', 'dbXJci4YR', 5);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Leeland', 'Eyam', 'leyam5@parallels.com', 'EvfdlEcS', 6);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Wallas', 'Pillington', 'wpillington6@samsung.com', 'j9ZUxqQ0eL', 2);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Holly', 'Dugan', 'hdugan7@mozilla.org', 'AvBwqx8zO', 2);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Herschel', 'Tabourin', 'htabourin8@arstechnica.com', 'paCZfam5r', 9);
insert into alumno (nombres, apellidos, correo, password, idGrupo) values ('Sheffy', 'Collinge', 'scollinge9@oakley.com', 'PijATpClEDf', 9);

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

