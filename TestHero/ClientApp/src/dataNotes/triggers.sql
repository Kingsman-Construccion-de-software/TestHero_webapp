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

/*DELIMITER //
DROP TRIGGER IF EXISTS after_create_alumno;
CREATE TRIGGER after_create_alumno
AFTER INSERT 
ON alumno FOR EACH ROW 
BEGIN
	
END */
//

DELIMITER //
DROP TRIGGER IF EXISTS alumno_insert_trigger;
CREATE TRIGGER alumno_insert_trigger AFTER INSERT ON alumno
FOR EACH ROW
BEGIN
    DECLARE power_count INT;
    DECLARE power_id INT;

    -- Obtiene la cantidad de poderes existentes
    SELECT COUNT(*) INTO power_count FROM poder;

    -- Itera sobre cada poder y crea una entrada en alumnopoder con cantidad 0 para el nuevo alumno
    SET power_id = 1;
    WHILE power_id <= power_count DO
        INSERT INTO alumnopoder (idAlumno, idPoder, cantidad) VALUES (NEW.idAlumno, power_id, 0);
        SET power_id = power_id + 1;
    END WHILE;
  
END //

DELIMITER ;


select * from profesor;