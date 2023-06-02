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
DROP PROCEDURE IF EXISTS get_alumno;
CREATE PROCEDURE get_alumno(IN corr VARCHAR(45), IN pass VARCHAR(45))
BEGIN
	SELECT correo, password, idAlumno, idGrupo
    FROM alumno
    WHERE correo = corr
    AND password = pass;
END //
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS get_alumno_by_correo;
CREATE PROCEDURE get_alumno_by_correo(IN corr VARCHAR(45))
BEGIN
	SELECT correo 
    FROM alumno
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


DELIMITER //
DROP PROCEDURE IF EXISTS get_grupo_examenes;
CREATE PROCEDURE get_grupo_examenes(IN idG int)
BEGIN
	SELECT idExamen, codigo, nombre, materia, fechaInicio, fechaFin, idGrupo 
    FROM examen
    WHERE idGrupo = idG;
END 
// DELIMITER ;

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
DROP PROCEDURE IF EXISTS get_examen_codigo;
CREATE PROCEDURE get_examen_codigo(IN cod VARCHAR(8))
BEGIN
	SELECT idExamen, codigo, nombre, materia, fechaInicio, fechaFin, idGrupo 
    FROM examen 
    WHERE cod = codigo;
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_alumnos_examen;
CREATE PROCEDURE  get_alumnos_examen(IN idE int)
BEGIN
	SELECT alumno.idAlumno, alumno.nombres, alumno.apellidos, alumnoexamen.calificacion, alumnoexamen.puntos
    from alumno 
    inner join grupo on 
    alumno.idGrupo = grupo.idGrupo 
    inner join alumnoexamen on
	alumno.idAlumno  = alumnoexamen.idAlumno 
    WHERE alumnoexamen.idExamen = idE;
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS insert_alumnos_examen;
CREATE PROCEDURE  insert_alumnos_examen(IN idA int, IN idE int, IN cal int, IN pun int, IN fecha datetime)
BEGIN
	INSERT INTO alumnoexamen(idAlumno, idExamen, calificacion, puntos, fechaRealizacion)
    VALUES(idA, idE, cal, pun, fecha);
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_alumno_pregunta;
CREATE PROCEDURE  get_alumno_pregunta(IN idA int, IN idP int)
BEGIN
	SELECT idAlumno, idPregunta, idRespuesta
    FROM alumnopregunta AS ap
    WHERE idAlumno = idA AND idP = idP;
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS insert_alumno_pregunta_respuesta;
CREATE PROCEDURE  insert_alumno_pregunta_respuesta(IN idA int, IN idP int, IN idR int)
BEGIN
	INSERT INTO alumnopregunta(idAlumno, idPregunta, idRespuesta)
    VALUES(idA, idP, idR);
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS insert_alumno_pregunta;
CREATE PROCEDURE  insert_alumno_pregunta(IN idA int, IN idP int)
BEGIN
	INSERT INTO alumnopregunta(idAlumno, idPregunta)
    VALUES(idA, idP);
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

DELIMITER //
DROP PROCEDURE IF EXISTS get_respuesta;
CREATE PROCEDURE get_respuesta(IN id int)
BEGIN
	SELECT idRespuesta, respuesta, esCorrecta, idPregunta 
    FROM respuesta
    WHERE idRespuesta = id;
END 
// DELIMITER ;


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
DROP PROCEDURE IF EXISTS get_etiquetas;
CREATE PROCEDURE get_etiquetas()
BEGIN
	SELECT idEtiqueta, nombre
    FROM etiqueta;
END //
DELIMITER ;

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
DROP PROCEDURE IF EXISTS insert_etiqueta;
CREATE PROCEDURE insert_etiqueta(IN nom VARCHAR(45))
BEGIN
	INSERT INTO etiqueta(nombre)
    VALUES(nom);
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


DELIMITER //
DROP PROCEDURE IF EXISTS get_alumnos_grupo;
CREATE PROCEDURE  get_alumnos_grupo(IN idG int)
BEGIN
    
	SELECT   alumno.nombres, alumno.apellidos,
    alumno.correo,grupo.idGrupo
    from grupo
   join alumno on 
    alumno.idGrupo = grupo.idGrupo 
    WHERE grupo.idGrupo = idG;
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS insert_grupo;
CREATE PROCEDURE insert_grupo(IN nom text ,IN idP int )
BEGIN
	INSERT INTO grupo(nombre,idProfesor) values(nom,idP);
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_alumno_full;
CREATE PROCEDURE get_alumno_full(IN id INT)
BEGIN
	SELECT nombres, apellidos, correo  
    FROM alumno
    WHERE idAlumno = id;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_alumnos_examenes;
CREATE PROCEDURE  get_alumnos_examenes(IN id int)
BEGIN
	SELECT examen.idExamen,examen.codigo,examen.nombre, examen.materia,
    examen.fechaInicio, examen.fechaFin, examen.idGrupo
    from examen
    inner join alumnoexamen on 
    examen.idExamen = alumnoexamen.idExamen
    inner join alumno on
	alumno.idAlumno  = alumnoexamen.idAlumno 
    WHERE alumnoexamen.idAlumno  = id;
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_alumnos_calificacion;
CREATE PROCEDURE  get_alumnos_calificacion(IN idE int, IN idA int)
BEGIN
	SELECT alumno.idAlumno, alumno.nombres, alumno.apellidos, alumnoexamen.calificacion, alumnoexamen.puntos
    from alumno 
    inner join grupo on 
    alumno.idGrupo = grupo.idGrupo 
    inner join alumnoexamen on
	alumno.idAlumno  = alumnoexamen.idAlumno 
    WHERE alumnoexamen.idExamen = idE AND
    alumno.idAlumno = idA;
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_alumnos_examenes;
CREATE PROCEDURE  get_alumnos_examenes(IN id int)
BEGIN
	SELECT examen.idExamen,examen.codigo,examen.nombre, examen.materia,
    examen.fechaInicio, examen.fechaFin, examen.idGrupo
    from examen
    inner join alumnoexamen on 
    examen.idExamen = alumnoexamen.idExamen
    inner join alumno on
	alumno.idAlumno  = alumnoexamen.idAlumno 
    WHERE alumnoexamen.idAlumno  = id;
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_grupo_alumnos;
CREATE PROCEDURE  get_grupo_alumnos(IN id int)
BEGIN
	SELECT grupo.idGrupo, grupo.nombre, grupo.idProfesor
    from grupo
    inner join alumno on
	grupo.idGrupo  = alumno.idGrupo
    WHERE alumno.idAlumno  = id;
END 
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_alumnopreguntas;
CREATE PROCEDURE get_alumnopreguntas(idA INT, idE INT)
BEGIN
	SELECT alumnopregunta.idAlumno, alumnopregunta.idPregunta, alumnopregunta.idRespuesta
    FROM alumnopregunta
    JOIN pregunta
    ON alumnopregunta.idPregunta = pregunta.idPregunta
	WHERE alumnopregunta.idAlumno = idA
    AND pregunta.idExamen = idE;
END;
// DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS insert_grupo_alumno;
CREATE PROCEDURE insert_grupo_alumno(idG INT, idA INT)
BEGIN
	UPDATE alumno
    SET alumno.idGrupo = idG
	WHERE alumno.idAlumno = idA;
END;
// DELIMITER ;

SELECT * FROM alumno;

DELIMITER //
DROP PROCEDURE IF EXISTS registra_profesor;
CREATE PROCEDURE registra_profesor(IN nom  VARCHAR(45),IN ape  VARCHAR(45),IN corr VARCHAR(45) ,IN pass VARCHAR(45))
BEGIN
	INSERT INTO profesor(nombres,apellidos,correo,password) values(nom,ape,corr,pass);
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS dame_profesor;
CREATE PROCEDURE  dame_profesor()
BEGIN
	SELECT nombres, apellidos, correo 
    FROM profesor;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS dame_alumno;
CREATE PROCEDURE  dame_alumno()
BEGIN
	SELECT nombres, apellidos, correo 
    FROM alumno;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS registra_alumno;
CREATE PROCEDURE registra_alumno(IN nom  VARCHAR(45),IN ape  VARCHAR(45),IN corr VARCHAR(45) ,IN pass VARCHAR(45))
BEGIN
	INSERT INTO alumno(nombres,apellidos,correo,password) values(nom,ape,corr,pass);
END //
DELIMITER ;

call registra_profesor("Papa","Solorzano","pruebapapa@gmail.com",12345678);
call  registra_alumno("Prueba","Solorzano","prueba@gmail.com",12345678);
call dame_profesor();
call dame_alumno();
select * from alumno;
select * from profesor;

