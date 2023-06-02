import styles from "./group.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import ProfesorContext from "context/contextoProfesor";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

/**
 * @author: Julio Meza
 * @license: GP
 * @version: 2.1.0
 * @description Esta clase esta dedicada al creacion de grupos
 */
export default function ExamGrupo({ parametro }) {
  // Estados
  const { state, setState } = useContext(ProfesorContext);
  const [examenes, setExamenes] = useState([]);
  const [grupo, setGrupo] = useState();
  const navigate = useNavigate();

  /**
   * Ruta que te manda a grupos
   */

  const goToCrearExamen = () => {
    navigate("/crear/examen");
  };
  /**obtener la informacion del grupo*/
  const getGrupo = async () => {
    const url = `api/grupo/${parametro}`;

    try {
      const result = await axios.get(url);
      if (result.data) {
        setGrupo(result.data[0]);
      }
    } catch (error) {
      alert(error);
    }
  };
  /** Obtener examenes por grupo*/
  const getExamenesGrupo = async () => {
    try {
      const url = "api/examen/grupo/" + parametro;
      const result = await axios.get(url);
      setExamenes([...result.data]);
    } catch (error) {
    }
  };

  useEffect(() => {
    getGrupo();
  }, [state.id]);

  useEffect(() => {
    getExamenesGrupo();
  }, [grupo]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        {examenes.length === 0 && (
          <div className="vacio">Comienza a crear exámenes para tu grupo.</div>
        )}
        <ul className={styles["exams-list"]}>
          {examenes &&
            examenes.map((examen, idx) => {
              return (
                <li
                  key={examen.idExamen}
                  className={
                    styles["exam-list-item"] +
                    ` ${styles[`border-color-${idx % 3}`]}`
                  }
                >
                  <Link to={`/resumen/examen?examen=${examen.idExamen}`}>
                    {examen.nombre}
                  </Link>
                </li>
              );
            })}
        </ul>

        <div>
          <>
            <BsFillPlusCircleFill
              className={styles["circulo"]}
              onClick={goToCrearExamen}
            />
          </>
        </div>
      </div>
    </div>
  );
}
