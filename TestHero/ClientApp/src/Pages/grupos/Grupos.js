import styles from "./grupos.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import ProfesorContext from "context/contextoProfesor";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
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
  const [grupos, setGrupos] = useState();
  const [selected, setSelected] = useState(false);
  const [fgrupo, setFgrupo] = useState("");

  /**Checa que esta seleccionado el boton de crear para desplegar el modal */
  const handleSelected = () => {
    setSelected(!selected);
  };
  const navigate = useNavigate();

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
          <h2>Mis grupos</h2>
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
                  <Link
                    to={`/group/resumen?grupo=${grupo.idGrupo}`}
                    onClick={() => saveState(grupo.idGrupo)}
                  >
                    {grupo.nombre}
                  </Link>
                </li>
              );
            })}
        </ul>
        <Modal show={selected} onHide={handleSelected} className="modal">
          <Modal.Header closeButton className={styles["modaldetalles2"]}>
            <Modal.Title>Nombre del grupo</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles["modaldetalles2"]}>
            <input
              className={styles["titulogrupo"]}
              placeholder="Escribe la grupo"
              value={fgrupo}
              required
              onChange={(e) => setFgrupo(e.target.value)}
              type="text"
            />
          </Modal.Body>
          <Modal.Footer className={styles["modaldetalles2"]}>
            <Button
              variant="secondary"
              onClick={creaGrupo}
              className={styles["botonCrear"]}
            >
              Crear
            </Button>
          </Modal.Footer>
        </Modal>

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
