import React from "react";
import styles from "./grupo.module.css";
import { useNavigate } from "react-router-dom";
/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 2.1.1
 * @license Gp
 * @params Recibe nombre,fechaFin, grupo y enlace
 * @description Clase para crear la etiqueta llamada grupo
 */
export default function Grupo({ nombre, fechaFin, grupo, link }) {
  const navigate = useNavigate();
  /**
   * Enlace para navegar de pagina a home
   */
  const goToExamen = () => {
    navigate(link);
  };

  return (
    <div className={styles['fondo']} onClick={goToExamen}>
      <div className={styles['imagenGrupo']}></div>
      <div className={styles['infoGrupo']}>
        <div className={styles['tituloCard']}>{nombre}</div>
        <div className={styles['subtitulo']}>{grupo}</div>
        <div className={styles['fecha']}>
          Disponible hasta el {fechaFin.substring(0, 10)}
        </div>
      </div>
    </div>
  );
}
