import React, { useState } from "react";
import styles from "./home.module.css";
import UserIcon from "../../assets/UserIcon.png";
import Sidebar from "../../components/sidebar/Sidebar.js";
import Grupo from "../../components/grupo/Grupo";
import { useContext, useEffect } from "react";
import ProfesorContext from "context/contextoProfesor";
import axios from "axios";

/**
 * @author: Leonardo García y Bernardo de la Sierra
 * @license: GP
 * @version: 2.0.0
 * Esta clase está dedicada a la página de home
 */

export default function HomePrincipal() {
  const { state, setState } = useContext(ProfesorContext);
  const [examenes, setExamenes] = useState([]);

  const getExamenesActivos = async () => {
    const url = "api/examen/profesor/" + state.id;

    try {
      const result = await axios.get(url);
      setExamenes([...result.data]);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getExamenesActivos();
  }, [state.id]);

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className={styles['home_background']}>
        <h1 className={styles['tituloPagina']}>¡Bienvenido!</h1>
        <div className={styles['datos']}>
          <img className={styles['icono']} src={UserIcon} alt="icono de usuario" />
          <span className={styles['nombreUsuario']}>{state.nombre}</span>
        </div>
        <div className={styles['examActuales']}>
          {examenes &&
            examenes.map((examen) => (
              <Grupo
                key={examen.idExamen}
                nombre={examen.nombre}
                fechaFin={examen.fechaFin}
                grupo={examen.grupo}
                link={`/resumen/examen?examen=${examen.idExamen}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
