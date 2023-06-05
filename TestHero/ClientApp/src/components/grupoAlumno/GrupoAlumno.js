import React from "react";
import styles from "./grupoAlumno.module.css";
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
    <div className={styles["fondo"]} onClick={goToExamen}>
      <div className={styles["imagenGrupo"]}></div>
      <div className={styles["infoGrupo"]}>
        <div className={styles["tituloCard"]}>{nombre}</div>
        <div className={styles["fecha"]}>
          Fecha límite: {fechaFin.substring(0, 10)}
        </div>
      </div>
    </div>
  );
}
