-- Store Procedures
-- Subrutina que funciona dentro de las database 
-- Ventajas: Son mas rapidos 

DELIMITER //
DROP PROCEDURE IF EXISTS ObtenerPuntos;
CREATE PROCEDURE  ObtenerPuntos(IN idUsuario int)
BEGIN
	SELECT usuarios.nombre, sum(juego.puntos) as SumaPuntos
    from usuarios
    inner join juego on
	juego.idUsuario  = usuarios.idUsuario 
    WHERE  usuarios.idUsuario  = idUsuario;
END 
// DELIMITER ;

call ObtenerPuntos(2);

