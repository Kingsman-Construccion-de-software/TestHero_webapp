import styles from "./grupos.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import ProfesorContext from "context/contextoProfesor";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

/**
 * @author: Bernardo de la Sierra
 * @license: GP
 * @version: 1.1.0
 * @description Esta clase esta dedicada al creacion de grupos
 */
export default function Grupos() {
  // Estados Iniciales
  const { state, setState } = useContext(ProfesorContext);
  const [grupos, setGrupos] = useState();
  const [selected, setSelected] = useState(false);

  /**Checa que esta seleccionado el boton de crear para desplegar el modal */
  const handleSelected = () => {
    setSelected(!selected);
  };
  // const navigate = useNavigate();

  /**
   * Ruta que te manda a grupos
   */
  // Cambiar
  // const goToCrearExamen = () => {
  //   navigate("/crear/examen?grupo=" + grupo.idGrupo);
  // };
  /**obtener la informacion del grupo*/
  const getGrupo = async () => {
    const url = "api/grupo/profesor/" + state.id;

    try {
      const result = await axios.get(url);
      if (result.data) {
        setGrupos(result.data);
      }
    } catch (error) {
      alert(error);
    }
  };
  /** Obtener examenes por grupo*/

  useEffect(() => {
    getGrupo();
    console.log(grupos);
  }, [state.id]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h1>Grupos</h1>
        <div className={styles["exams-list-header-container"]}>
          <h2>Resultados de grupos</h2>
          <input
            className={styles["search-bar"]}
            type="search"
            placeholder="Buscar"
          />
        </div>
        <ul className={styles["exams-list"]}>
          {grupos &&
            grupos.map((grupo, idx) => {
              return (
                <li
                  key={grupo.idGrupo}
                  className={
                    styles["exam-list-item"] +
                    ` ${styles[`border-color-${idx % 3}`]}`
                  }
                >
                  {/* <Link to={`$grupo=${grupo.idGrupo}`}> */}
                  {grupo.nombre}
                  {/* </Link> */}
                </li>
              );
            })}
        </ul>

        <div
          onClick={() => {
            handleSelected();
          }}
        >
          {!selected && <BsFillPlusCircleFill className="circulo" />}
        </div>
      </div>
    </div>
  );
}
