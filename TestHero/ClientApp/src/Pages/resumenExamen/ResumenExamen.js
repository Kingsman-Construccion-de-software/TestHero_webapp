import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./resumenexamen.module.css";
import { useState, useEffect, useRef, useContext } from "react";

import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import ProfesorContext from "context/contextoProfesor";

import { useSearchParams, useNavigate } from "react-router-dom";
import MultipleViewCard from "components/multiple-view-card/MultipleViewCard";
import Questions from "Pages/questions/questions";
import Results from "Pages/results/Results";
/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Clase que renderea los componentes
 */
export default function ResumenExamen() {
  // Estados iniciales
  const [examen, setExamen] = useState();

  const [text, setText] = useState("https://localhost:44423/examenAlumno");

  const inputRef = useRef(null);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state, setState } = useContext(ProfesorContext);

  const getExamen = async () => {
    try {
      const url = "api/examen/" + searchParams.get("examen");
      const res = await axios.get(url);
      setExamen(res.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteExam = async () => {
    const url = "api/examen/" + examen.idExamen;

    try {
      const res = await axios.delete(url);
      navigate(`/resumen/grupo?grupo=${state.idGrupo}`);
    } catch (e) {
      alert(e);
    }
  };

  const EditExam = () => {
    navigate("/editar/examen");
  };

  console.log(examen);

  useEffect(() => {
    getExamen();
  }, []);

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className={styles["page"]}>
        <div className={styles["content"]}>
          {examen && (
            <div className={styles["title-row"]}>
              <h1 className={styles["tituloExamen"]}>{examen.nombre}</h1>
            </div>
          )}
          <div className={styles["subtitles"]}>
            {examen && (
              <h2 className={styles["subtitle"]}>Código: {examen.codigo}</h2>
            )}
            <button onClick={EditExam}>Editar</button>
            <button onClick={() => setShow(true)}>Eliminar exámen</button>
          </div>
        </div>
      </div>
      <div>
        <MultipleViewCard
          views={[
            { title: "Preguntas", component: <Questions /> },
            {
              title: "Resultados",
              component: <Results codigos={examen} />,
            },
          ]}
        />
      </div>

      <Modal show={show} onHide={handleClose} className={styles["modal"]}>
        <Modal.Header closeButton className={styles["modaldetalles3"]}>
          <Modal.Title>
            ¿Estás seguro de que deseas eliminar este examen?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${styles.modaldetalles3} ${styles.fontbody}`}>
          No se podrá recuperar después
        </Modal.Body>
        <Modal.Footer className={styles["modaldetalles3"]}>
          <Button
            variant="secondary"
            onClick={handleClose}
            className={styles["botonCancelar2"]}
          >
            Cancelar
          </Button>
          <Button
            variant="secondary"
            onClick={() => deleteExam()}
            className={styles["botonEliminar"]}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
