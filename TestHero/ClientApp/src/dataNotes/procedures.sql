USE testhero;

DELIMITER //
DROP PROCEDURE IF EXISTS get_profesor;
CREATE PROCEDURE get_profesor(IN corr VARCHAR(45), IN pass VARCHAR(45))
BEGIN
	SELECT correo, password, idProfesor from profesor
    WHERE correo = corr
    AND password = pass;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_profesor_full;
CREATE PROCEDURE get_profesor_full(IN id INT)
BEGIN
	SELECT nombres, apellidos, correo 
    FROM profesor
    WHERE idProfesor = id;
END //
DELIMITER ;

CALL get_profesor_full(5);

DELIMITER //
DROP PROCEDURE IF EXISTS get_profesor_by_correo;
CREATE PROCEDURE get_profesor_by_correo(IN corr VARCHAR(45))
BEGIN
	SELECT correo 
    FROM profesor
    WHERE correo = corr;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_preguntas_examen;
CREATE PROCEDURE get_preguntas_examen(IN idE int)
BEGIN
	SELECT idPregunta, pregunta, idExamen
    FROM pregunta 
    WHERE idExamen = idE;
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_pregunta;
CREATE PROCEDURE get_pregunta(IN id INT)
BEGIN
	SELECT  idPregunta, pregunta, idExamen
    FROM pregunta
    WHERE idPregunta = id;
END //
DELIMITER ;

CALL get_pregunta(1);

DELIMITER //
DROP PROCEDURE IF EXISTS insert_pregunta;
CREATE PROCEDURE insert_pregunta(IN preg text ,IN idE int )
BEGIN
	INSERT INTO pregunta(pregunta,idExamen) values(preg,idE);
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS update_pregunta;
CREATE PROCEDURE update_pregunta(IN id INT, IN preg text)
BEGIN
	UPDATE pregunta
    SET pregunta = preg
    WHERE idPregunta = id;
END //
DELIMITER ;

SELECT * FROM pregunta;

DELIMITER //
DROP PROCEDURE IF EXISTS delete_pregunta;
CREATE PROCEDURE delete_pregunta(IN id INT)
BEGIN
	DELETE  from pregunta
    where idPregunta = id;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_profesor_examenes_activos;
CREATE PROCEDURE get_profesor_examenes_activos(IN idP int)
BEGIN
	SELECT e.idExamen, e.nombre, e.fechaFin, g.nombre as grupo
    FROM examen as e
    JOIN grupo as g
    ON g.idGrupo =  e.idGrupo
    WHERE g.idProfesor = idP
    AND e.fechaFin > NOW();
END 
// DELIMITER ;

CALL get_profesor_examenes_activos(1);

DELIMITER //
DROP PROCEDURE IF EXISTS get_grupo_examenes;
CREATE PROCEDURE get_grupo_examenes(IN idG int)
BEGIN
	SELECT idExamen, codigo, nombre, materia, fechaInicio, fechaFin, idGrupo 
    FROM examen
    WHERE idGrupo = idG;
END 
// DELIMITER ;

CALL get_grupo_examenes(5);

DELIMITER //
DROP PROCEDURE IF EXISTS get_examen;
CREATE PROCEDURE get_examen(IN id int)
BEGIN
	SELECT idExamen, codigo, nombre, materia, fechaInicio, fechaFin, idGrupo 
    FROM examen 
    WHERE idExamen = id;
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_alumnos_examen;
CREATE PROCEDURE  get_alumnos_examen(IN idG int)
BEGIN
	SELECT alumno.nombres, alumno.apellidos, grupo.nombre as Grupo, alumnoexamen.calificacion 
    from alumno 
    inner join grupo on 
    alumno.idGrupo = grupo.idGrupo 
    inner join alumnoexamen on
	alumno.idAlumno  = alumnoexamen.idAlumno 
    WHERE alumnoexamen.idExamen = idG;
END 
// DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS insert_examen;
CREATE PROCEDURE insert_examen(IN cod VARCHAR(8), IN nom varchar(45), IN mat varchar(45), IN fInicio datetime ,IN fFin datetime, IN idG int )
BEGIN
	INSERT INTO examen(codigo,fechaInicio,fechaFin,nombre,materia,idGrupo) values(cod,fInicio,fFin,nom,mat,idG);
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_respuestas_pregunta;
CREATE PROCEDURE get_respuestas_pregunta(IN idP int)
BEGIN
	SELECT idRespuesta, respuesta, esCorrecta, idPregunta 
    FROM respuesta
    WHERE idPregunta = idP;
END 
// DELIMITER ;

CALL get_respuestas_pregunta(2);

DELIMITER //
DROP PROCEDURE IF EXISTS get_respuesta;
CREATE PROCEDURE get_respuesta(IN id int)
BEGIN
	SELECT idRespuesta, respuesta, esCorrecta, idPregunta 
    FROM respuesta
    WHERE idRespuesta = id;
END 
// DELIMITER ;

CALL get_respuesta(1);

DELIMITER //
DROP PROCEDURE IF EXISTS insert_respuesta;
CREATE PROCEDURE insert_respuesta(IN resp text ,IN corr tinyint,IN idP int )
BEGIN
	INSERT INTO respuesta(respuesta,esCorrecta,idPregunta) values(resp,corr,idP);
END //
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS update_respuesta;
CREATE PROCEDURE update_respuesta(IN id INT, IN resp text ,IN corr TINYINT)
BEGIN
	UPDATE respuesta
    SET respuesta = resp, esCorrecta = corr
    WHERE idRespuesta = id;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_grupos_profesor;
CREATE PROCEDURE get_grupos_profesor(IN idP int)
BEGIN
	SELECT idGrupo, nombre, idProfesor
    FROM grupo
    WHERE idProfesor = idP;
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_grupo;
CREATE PROCEDURE get_grupo(IN id INT)
BEGIN
	SELECT idGrupo, nombre, idProfesor
    FROM grupo
    WHERE idGrupo = id;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_etiquetas_examen;
CREATE PROCEDURE get_etiquetas_examen(IN idE int)
BEGIN
	SELECT e.idEtiqueta, e.nombre
    FROM etiqueta as e
    JOIN examenEtiqueta as ee
    ON e.idEtiqueta = ee.idEtiqueta
    WHERE ee.idExamen = idE;
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_etiqueta;
CREATE PROCEDURE get_etiqueta(IN id INT)
BEGIN
	SELECT idEtiqueta, nombre
    FROM etiqueta
    WHERE idEtiqueta = id;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS insert_etiquetas_examen;
CREATE PROCEDURE insert_etiquetas_examen(IN idEx INT, IN idEt INT)
BEGIN
	INSERT INTO ExamenEtiqueta
    VALUES(idEx, idEt);
END //
DELIMITER ;


CALL insert_etiquetas_examen(1, 1);
CALL get_etiquetas_examen(1);
SELECT * FROM profesor;