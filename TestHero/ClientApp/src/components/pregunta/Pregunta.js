import React from "react";
import { FaArrowDown, FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import styles from "./pregunta.module.css";
import swal from "sweetalert";
import { BsFillCaretDownFill } from "react-icons/bs";

/**
 * @author Bernardo de la Sierra y Julio Meza, LGnan (color)
 * @version 3.1.2
 * @license Gp
 * @params Recibe pregunta, filtraprefuntas y getpreguntas
 * @description Este formulario edita y elimina preguntas, es como la parte de adentro
 */
export default function Pregunta({
  pregunta,
  filterPreguntas,
  getPreguntas,
  etiquetas,
}) {
  // Aparicio de datos
  const [open, setOpen] = useState(false);
  const [showing, setShowing] = useState(false);
  const [actionable, setActionable] = useState(true);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  // Actualizador de pregunta
  const [fpregunta, setFpregunta] = useState(pregunta.textoPregunta);
  const [opcion1, setOpcion1] = useState("");
  const [opcion2, setOpcion2] = useState("");
  const [opcion3, setOpcion3] = useState("");
  const [opcion4, setOpcion4] = useState("");
  //Actilizador de respuestas
  const opciones = [opcion1, opcion2, opcion3, opcion4];
  const setOpciones = [setOpcion1, setOpcion2, setOpcion3, setOpcion4];
  const [respuestas, setRespuestas] = useState([]);
  const [activo, setActivo] = useState(false);
  const [selects, setSelects] = useState([]);
  const [etiqueta, setEtiqueta] = useState(0);
  const handleOptionChange = (event) => {
    setSelectedValue(parseInt(event.target.value));
  };

  /**
   * Funcion para hacer el drag and drop de la pregunta
   */
  const toggleOpen = () => {
    setActionable(true);
    setOpen(!open);
  };
  /**
   * Te da cuerto tiempo para ver si la pregunta esta abierta sino se cierra
   */
  const timeOutOpen = () => {
    console.log(pregunta);
    if (actionable) {
      setActionable(false);
      setShowing(!showing);
      if (open) {
        setTimeout(toggleOpen, 1000);
      } else {
        toggleOpen();
      }
    }
  };
  //Funciones anonimas para abrir o cerrar cierto evento
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /**
   *Funcion para obtener todas las respuestas
   */
  const getRespuestas = async () => {
    const URIrespuestas = "api/respuesta/pregunta/";
    const res = await axios.get(`${URIrespuestas}${pregunta.idPregunta}`);
    setRespuestas(res.data);
    let correctIndex = res.data.findIndex((it) => it.esCorrecta === 1);
    setSelectedValue(correctIndex);
  };

  /**
   *Funcion para obtener la etiqueta de una pregunta
   */
  const getNombreEtiqueta = async () => {
    const URIetiqueta = "api/etiquetanombre/";
    const res = await axios.get(`${URIetiqueta}${pregunta.idPregunta}`);
    setSelects(res.data[0].nombre);
  };
  /**
   * Funcion para abrir o cerrar todas las respuestas
   */
  const handleSelected = () => {
    setSelected(!selected);
  };
  /**
   * Funcion para eliminar las preguntas dado un idPregunta
   */
  const deletePregunta = async () => {
    const URIdelete = "api/pregunta/";
    await axios.delete(`${URIdelete}${pregunta.idPregunta}`);
    filterPreguntas(pregunta.idPregunta);
    swal({
      title: "Se ha eliminado una pregunta",
      button: "Aceptar",
      icon: "error",
    });
    getRespuestas();
    handleClose();
  };
  /**
   * Actualiza una pregunta dado un idPregunta
   */
  const updatePregunta = async (e) => {
    e.preventDefault();

    const URIupdate = "api/pregunta/";
    await axios.put(`${URIupdate}${pregunta.idPregunta}`, {
      textoPregunta: fpregunta,
      IdEtiqueta: etiqueta,
    });

    await opciones.forEach((opcion, idx) => {
      let respuesta = {
        TextoRespuesta: opcion,
        EsCorrecta: selectedValue === idx ? 1 : 0,
        IdPregunta: pregunta.idPregunta,
      };
      updateRespuesta(respuesta, idx);
    });
    swal({
      title: "Se ha actualizado una pregunta",
      button: "Aceptar",
      icon: "success",
    });
    getPreguntas();
    getRespuestas();
    handleSelected();
  };
  /**
   * Actualiza una respuesta dado un idPregunta
   */
  const updateRespuesta = async (respuesta, idx) => {
    const URIupdateP = "api/respuesta/";
    await axios.put(`${URIupdateP}${respuestas[idx].idRespuesta}`, respuesta);
  };
  /**
   * Funcion para activar el punto al crear una respueta
   */
  const initializeOpciones = () => {
    if (selectedValue === 0) {
      respuestas[0].esCorrecta = 1;
    } else if (selectedValue === 1) {
      respuestas[1].esCorrecta = 1;
    } else if (selectedValue === 2) {
      respuestas[2].esCorrecta = 1;
    } else if (selectedValue === 3) {
      respuestas[3].esCorrecta = 1;
    }

    respuestas.forEach((respuesta, index) => {
      setOpciones[index](respuesta.textoRespuesta);
    });
  };

  const createPregunta = () => {
    return (
      <form>
        <div className={styles["dropdown"]}>
          <p className={styles["titulo"]}>{pregunta.textoPregunta}</p>
          <div className={styles["pregIcon"]} onClick={timeOutOpen}>
            <FaArrowDown size={40} />
          </div>
        </div>
        {open && (
          <>
            <div
              className={
                showing
                  ? `${styles.extension} ${styles.showing}`
                  : `${styles.extension} ${styles.hiding}`
              }
            >
              <div className={styles["respuestas"]}>
                {respuestas &&
                  respuestas.map((respuesta, index) => (
                    <div className={styles["respuesta"]} key={index}>
                      <>
                        {respuesta.esCorrecta === 1 ? (
                          <input
                            type="radio"
                            checked
                            name={`opcion`}
                            value={`opcion${index}`}
                          />
                        ) : (
                          <input
                            disabled
                            type="radio"
                            name={`opcion`}
                            value={`opcion${index}`}
                          />
                        )}
                        <p>{respuesta.textoRespuesta} </p>
                      </>
                    </div>
                  ))}
              </div>
              {actionable && (
                <div className={styles["iconsRespuesta"]}>
                  <div className={styles["crudIcon1"]} onClick={handleSelected}>
                    <FaEdit size={35} />
                  </div>
                  <div className={styles["crudIcon2"]}>
                    <MdCancel size={35} onClick={handleShow} />
                  </div>
                </div>
              )}
            </div>
            <div className={styles["contenedorEtiqueta"]}>
              <div className={styles["dropdown2"]}>
                {selects === null ? (
                  <div
                    className={styles["dropdown2-btn"]}
                    onClick={(e) => setActivo(!activo)}
                  >
                    Elige una etiqueta
                  </div>
                ) : selects === "" ? (
                  <div
                    className={styles["dropdown2-btn"]}
                    onClick={(e) => setActivo(!activo)}
                  >
                    {selects}
                  </div>
                ) : (
                  <div
                    className={styles["dropdown2-btn"]}
                    onClick={(e) => setActivo(!activo)}
                  >
                    {selects}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </form>
    );
  };

  const createFormPregunta = () => {
    return (
      <form onSubmit={updatePregunta}>
        <div className={styles["dropdown"]}>
          <input
            className={styles["inputpregunta"]}
            value={fpregunta}
            required
            onChange={(e) => setFpregunta(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles["extension"]}>
          <div className={styles["respuestas"]}>
            {respuestas &&
              respuestas.map((respuesta, index) => (
                <div className={styles["respuesta"]} key={index}>
                  {selected && (
                    <>
                      <input
                        type="radio"
                        value={index}
                        name="opciones"
                        required
                        checked={selectedValue === index}
                        onChange={handleOptionChange}
                      />
                      <input
                        name="opciones"
                        required
                        placeholder={`Opcion ${index + 1}`}
                        className={styles["opciones"]}
                        value={opciones[index]}
                        onChange={(e) => setOpciones[index](e.target.value)}
                        type="text"
                      />
                    </>
                  )}
                </div>
              ))}
          </div>
          <div className={styles["iconsRespuesta"]}>
            <div className={styles["crudIcon1"]} onClick={handleSelected}>
              <FaEdit size={35} />
            </div>
            <div className={styles["crudIcon2"]}>
              <MdCancel size={35} onClick={handleShow} />
            </div>
          </div>
        </div>
        <div className={styles["contenedorEtiqueta"]}>
          <div className={styles["dropdown2"]}>
            {selects === null ? (
              <div
                className={styles["dropdown2-btn"]}
                onClick={(e) => setActivo(!activo)}
              >
                Elige una etiqueta
                <BsFillCaretDownFill />
              </div>
            ) : selects === "" ? (
              <div
                className={styles["dropdown2-btn"]}
                onClick={(e) => setActivo(!activo)}
              >
                Elige una etiqueta
                <BsFillCaretDownFill />
              </div>
            ) : (
              <div
                className={styles["dropdown2-btn"]}
                onClick={(e) => setActivo(!activo)}
              >
                {selects}
                <BsFillCaretDownFill />
              </div>
            )}

            {activo && (
              <div className={styles["dropdown2-content"]}>
                {etiquetas.map((op) => (
                  <div
                    className={styles["dropdown2-item"]}
                    key={op.idEtiqueta}
                    onClick={(e) => {
                      setSelects(op.nombre);
                      setActivo(false);
                      setEtiqueta(op.idEtiqueta);
                    }}
                  >
                    {op.nombre}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <p className={styles["aviso"]}>
          Asegúrate de llenar todos los campos y marcar una respuesta como
          correcta.
        </p>
        <button
          className={styles["botonCancelarPreguntaEditar"]}
          onClick={handleSelected}
        >
          Cancelar
        </button>
        <input
          type="submit"
          value="Guardar Pregunta"
          className={styles["botonPreguntas"]}
        />
      </form>
    );
  };

  useEffect(() => {
    getRespuestas();
    getNombreEtiqueta();
  }, []);

  useEffect(() => {
    if (selected) {
      initializeOpciones();
    }
  }, [selected]);

  return (
    <div className={styles["pregunta"]}>
      {!selected && createPregunta()}
      {selected && createFormPregunta()}

      <Modal show={show} onHide={handleClose} className={styles["modal"]}>
        <Modal.Header closeButton className={styles["modaldetalles3"]}>
          <Modal.Title>
            ¿Estás seguro de que deseas eliminar esta pregunta?
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
            onClick={() => deletePregunta()}
            className={styles["botonEliminar"]}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
