import styles from "./examenes.module.css";

import SidebarAlumno from "../../components/sidebarAlumno/SidebarAlumno";
import ProfesorContext from "context/contextoProfesor";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
/**
 * @author: Bernardo de la Sierra
 * @license: GP
 * @version: 1.1.0
 * @description Esta clase esta dedicada al creacion de examenes
 */
export default function Examenes() {
  // Estados Iniciales
  const { state, setState } = useContext(ProfesorContext);
  const [examenes, setExamenes] = useState([]);
  const [search, setSearch] = useState("");
  //Metodo de filtrado y busqueda
  const buscador = (e) => {
    setSearch(e.target.value);
  };
  const resultados = !search
    ? examenes
    : examenes.filter((examen) =>
        examen.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );

  const saveState = (idGrupo) => {
    const newState = state;
    newState.idGrupo = idGrupo;
    setState(newState);
  };
  const getGrupo = async () => {
    const url = "api/alumno/examenes/" + state.id;

    try {
      const result = await axios.get(url);
      if (result.data) {
        setExamenes(result.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getGrupo();
  }, [state.id]);

  return (
    <div className={styles.container}>
      <SidebarAlumno />
      <div className={styles.mainContent}>
        <h1>Exámenes</h1>
        <div className={styles["exams-list-header-container"]}>
          <h2 className={styles["margen"]}>Mis exámenes</h2>
          <input
            className={styles["search-bar2"]}
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={buscador}
          />
        </div>
        {examenes.length === 0 && (
          <div className={styles["lista"]}>No hay examenes registrados</div>
        )}
        <ul className={styles["exams-list"]}>
          {resultados &&
            resultados.map((examen, idx) => {
              return (
                <li
                  key={examen.idExamen}
                  className={
                    styles["exam-list-item"] +
                    ` ${styles[`border-color-${idx % 3}`]}`
                  }
                >
                  <Link
                    to={`/resumenAlumno?examen=${examen.idExamen}`}
                    onClick={() => saveState(examen.idExamen)}
                  >
                    {examen.nombre}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
