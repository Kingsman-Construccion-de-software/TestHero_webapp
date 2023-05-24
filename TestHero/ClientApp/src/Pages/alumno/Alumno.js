import styles from "./alumno.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import userIcon from "../../assets/UserIcon.png";
import ProfesorContext from "context/contextoProfesor";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
/**
 * @author  Julio Meza y Bernardo de la Sierra(Modifico)
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Clase que muestra los resultados de los alumnos
 */
export default function Results() {
  // Inicializacion de estados
  const { state, setState } = useContext(ProfesorContext);
  const [alumno, setAlumno] = useState([]);

  /**Obtencion de la informacion del alumno */
  const getAlumno = async () => {
    const url = "api/grupo/alumno/" + state.idGrupo;

    try {
      const result = await axios.get(url);
      if (result.data) {
        setAlumno(result.data);
        console.log(result.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAlumno();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        {alumno.length === 0 ? (
          <>
            <div className="vacio">
              Comparte este enlace con tus alumnos para que puedan unirse al
              grupo.
            </div>
          </>
        ) : (
          <>
            <ul className={styles.table}>
              <li className={styles.row + " " + styles["row-colored"]}>
                <span></span>
                <span className={styles["table-title"]}>Nombre(s)</span>
                <span className={styles["table-title"]}>Apellido(s)</span>
              </li>
              {alumno &&
                alumno.map((el, idx) => (
                  <li
                    className={
                      styles.row +
                      `${idx % 2 !== 0 ? ` ${styles["row-colored"]}` : ""}`
                    }
                  >
                    <img src={userIcon} alt="foto" />
                    <span>{el.nombres}</span>
                    <span>{el.apellidos}</span>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
