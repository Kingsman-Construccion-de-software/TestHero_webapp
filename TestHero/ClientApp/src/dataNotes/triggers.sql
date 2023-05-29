USE testhero;

DELIMITER //
DROP TRIGGER IF EXISTS before_exam_delete;
CREATE TRIGGER before_exam_delete
BEFORE DELETE
ON examen FOR EACH ROW 
BEGIN
	DELETE FROM pregunta
    WHERE idExamen = OLD.idExamen;
    DELETE FROM alumnoExamen
    WHERE idExamen = OLD.idExamen;
    DELETE FROM examenpoder
    WHERE idExamen = OLD.idExamen;
    DELETE FROM examenetiqueta
    WHERE idExamen = OLD.idExamen;
END 
//
DELIMITER ;

DELIMITER //
DROP TRIGGER IF EXISTS before_pregunta_delete;
CREATE TRIGGER before_pregunta_delete
BEFORE DELETE
ON pregunta FOR EACH ROW 
BEGIN
	DELETE FROM respuesta
    WHERE idPregunta = OLD.idPregunta;
    DELETE FROM alumnopregunta
    WHERE idPregunta = OLD.idPregunta;
END 
//
DELIMITER ;

SELECT * FROM alumno;
SELECT * FROM examen;