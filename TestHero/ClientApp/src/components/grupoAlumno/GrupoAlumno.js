import React from "react";
import "./grupoAlumno.css";
import { useNavigate } from "react-router-dom";
/**
 * @author Bernardo de la Sierra
 * @version 2.1.1
 * @license Gp
 * @params Recibe nombre,fechaFin y enlace
 * @description Clase para crear la etiqueta de los examenes
 */
export default function GrupoAlumno({ nombre, fechaFin, link }) {
  const navigate = useNavigate();
  /**
   * Enlace para navegar de pagina a home
   */
  const goToExamen = () => {
    navigate(link);
  };

  return (
    <div className="fondo" onClick={goToExamen}>
      <div className="imagenGrupo"></div>
      <div className="infoGrupo">
        <div className="tituloCard">{nombre}</div>
        <br></br>
        <br></br>
        <br></br>
        <div className="fecha">
          Disponible hasta el {fechaFin.substring(0, 10)}
        </div>
      </div>
    </div>
  );
}
