import styles from "./grupos.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import ProfesorContext from "context/contextoProfesor";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import swal from "sweetalert";

/**
 * @author: Bernardo de la Sierra
 * @license: GP
 * @version: 1.1.0
 * @description Esta clase esta dedicada al creacion de grupos
 */

export default function Grupos() {

  // Estados Iniciales
  const { state, setState } = useContext(ProfesorContext);
  const [grupos, setGrupos] = useState([]);
  const [selected, setSelected] = useState(false);
  const [fgrupo, setFgrupo] = useState("");
  const [search, setSearch] = useState("");

  //Metodo de filtrado y busqueda
  const buscador = (e) => {
    setSearch(e.target.value);
  };
  const resultados = !search
    ? grupos
    : grupos.filter((grupo) =>
        grupo.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );

  /**Checa que esta seleccionado el boton de crear para desplegar el modal */
  const handleSelected = () => {
    setSelected(!selected);
  };

  const saveState = (idGrupo) => {
    const newState = state;
    newState.idGrupo = idGrupo;
    setState(newState);
  };
  const getGrupo = async () => {
    const url = "api/grupo/profesor/" + state.id;

    try {
      const result = await axios.get(url);
      if (result.data) {
        console.log(result.data);
        setGrupos(result.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  /** Obtener examenes por grupo*/
  const URIgrupo = "api/grupo";
  const creaGrupo = async (e) => {
    e.preventDefault();
    const result = await axios.post(URIgrupo, {
      idProfesor: state.id,
      Nombre: fgrupo,
    });
    console.log(result);
    swal({
      title: "Se ha creado un grupo",
      button: "Aceptar",
      icon: "success",
    });
    getGrupo();
    setFgrupo("");
    handleSelected();
  };
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
          <h2 className={styles["margen"]}>Mis grupos</h2>
          <input
            className={styles["search-bar2"]}
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={buscador}
          />
        </div>
        {grupos.length === 0 && (
          <div className={styles["lista"]}>Comienza a crear tus grupos</div>
        )}
        <ul className={styles["exams-list"]}>
          {resultados &&
            resultados.map((grupo, idx) => {
              return (
                <li
                  key={grupo.idGrupo}
                  className={
                    styles["exam-list-item"] +
                    ` ${styles[`border-color-${idx % 3}`]}`
                  }
                >
                  <Link
                    to={`/resumen/grupo?grupo=${grupo.idGrupo}`}
                    onClick={() => saveState(grupo.idGrupo)}
                  >
                    {grupo.nombre}
                  </Link>
                </li>
              );
            })}
        </ul>
        <Modal show={selected} onHide={handleSelected} className={styles["modal"]}>
          <Modal.Header 
            className={styles["modaldetalles2"]}>
            <Modal.Title>Nombre del grupo</Modal.Title>
            <button 
              type="button" 
              class="btn-close btn-close-white" 
              onClick={() => setSelected(false)}
              aria-label="Close"></button> 
          </Modal.Header>
          <form onSubmit={creaGrupo}>
            <Modal.Body className={styles["modaldetalles2"]}>
              <input
                className={styles["titulogrupo"]}
                placeholder="Escribe el grupo"
                value={fgrupo}
                required
                onChange={(e) => setFgrupo(e.target.value)}
                type="text"
              />
            </Modal.Body>
            <Modal.Footer className={styles["modaldetalles2"]}>
              <Button
                variant="secondary"
                type="submit"
                className={styles["botonCrear"]}
              >
                Crear
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        <div
          onClick={() => {
            handleSelected();
          }}
        >
          {!selected && <BsFillPlusCircleFill className={styles["circulo"]} />}
        </div>
      </div>
    </div>
  );
}
