import styles from "./results.module.css";
import Sidebar from "../../components/sidebar/Sidebar";

// Icons
import userIcon from "../../assets/UserIcon.png";
import ProfesorContext from "context/contextoProfesor";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
/**
 * @author  Julio Meza y Bernardo de la Sierra(Modifico)
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Clase que muestra los resultados de los alumnos
 */
export default function Results({ codigos }) {
  // Inicializacion de estados
  const [searchParams] = useSearchParams();
  const [examen, setExamen] = useState();
  const [calificaciones, setCalificaciones] = useState([]);
  /**Obtencion de la informacion del examen */
  const getExamen = async () => {
    const url = "api/examen/" + searchParams.get("examen");

    try {
      const result = await axios.get(url);
      if (result.data) {
        setExamen(result.data[0]);
      }
    } catch (error) {
      alert(error);
    }
  };
  /**Obtener las claificaciones */
  const getCalificaciones = async () => {
    try {
      const url = "api/alumno/examen/" + examen.idExamen;
      const result = await axios.get(url);
      setCalificaciones([...result.data]);
    } catch (error) {
    }
  };

  useEffect(() => {
    getExamen();
  }, []);

  useEffect(() => {
    getCalificaciones();
  }, [examen]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        {calificaciones && calificaciones.length === 0 ? (
          <>
            <div className={styles.vacio}>
              Comparte el código del examen con tus alumnos para que puedan
              responderlo.
            </div>
            <h2 className={styles.vacio}>
              Código: {codigos.codigo}
            </h2>
          </>
        ) : (
          <>
            <ul className={styles.table}>
              <li className={styles.row + " " + styles["row-colored"]}>
                <span></span>
                <span className={styles["table-title"]}>Nombre(s)</span>
                <span className={styles["table-title"]}>Apellido(s)</span>
                <span className={styles["table-title"]}>Calificación</span>
              </li>
              {calificaciones &&
                calificaciones.map((el, idx) => (
                  <li
                    className={
                      styles.row +
                      `${idx % 2 !== 0 ? ` ${styles["row-colored"]}` : ""}`
                    }
                  >
                    <img src={userIcon} alt="foto" />
                    <span>{el.nombres}</span>
                    <span>{el.apellidos}</span>
                    <span>{el.calificacion}</span>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
