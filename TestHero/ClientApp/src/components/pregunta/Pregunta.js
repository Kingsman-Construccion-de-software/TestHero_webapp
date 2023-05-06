import React from "react";
import { FaArrowDown, FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./Pregunta.css";

export default function Pregunta({ pregunta, filterPreguntas, getPreguntas }) {
  const [open, setOpen] = useState(false);
  const [showing, setSbowing] = useState(false);
  const [show, setShow] = useState(false);
  const [fpregunta, setFpregunta] = useState(pregunta.textoPregunta);
  const [opcion1, setOpcion1] = useState("");
  const [opcion2, setOpcion2] = useState("");
  const [opcion3, setOpcion3] = useState("");
  const [opcion4, setOpcion4] = useState("");
  const opciones = [opcion1, opcion2, opcion3, opcion4];
  const setOpciones = [setOpcion1, setOpcion2, setOpcion3, setOpcion4];
  const [respuestas, setRespuestas] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleOptionChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const toggleOpen = () => {
    setOpen(!open);
  };

  const timeOutOpen = () => {
    setSbowing(!showing);
    if (open) {
      setTimeout(toggleOpen, 1000);
    } else {
      toggleOpen();
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getRespuestas = async () => {
    const URIrespuestas = "api/respuesta/pregunta/";
    const res = await axios.get(`${URIrespuestas}${pregunta.idPregunta}`);
    setRespuestas(res.data);
  };

  const handleSelected = () => {
    setSelected(!selected);
  };

  const deletePregunta = async () => {
    const URIdelete = "api/pregunta/";
    await axios.delete(`${URIdelete}${pregunta.idPregunta}`);
    filterPreguntas(pregunta.idPregunta);
    getRespuestas();
    handleClose();
  };

  const updatePregunta = async () => {
    const URIupdate = "api/pregunta/";
    await axios.put(`${URIupdate}${pregunta.idPregunta}`, {
      textoPregunta: fpregunta,
    });

    await opciones.forEach((opcion, idx) => updateRespuesta(opcion, idx));
    getPreguntas();
    getRespuestas();
    handleSelected();
  };

  const updateRespuesta = async (respuesta, idx) => {
    const URIupdateP = "api/respuesta/";
    await axios.put(`${URIupdateP}${respuestas[idx].idRespuesta}`, {
      textoRespuesta: respuesta,
    });
  };

  const initializeOpciones = () => {
    console.log(selectedValue);
    if (selectedValue === "opcion0") {
      respuestas[0].esCorrecta = 1;
    } else if (selectedValue === "opcion1") {
      respuestas[1].esCorrecta = 1;
    } else if (selectedValue === "opcion2") {
      respuestas[2].sCorrecta = 1;
    } else if (selectedValue === "opcion3") {
      respuestas[3].EsCorrecta = 1;
    }
    console.log(respuestas);
    respuestas.forEach((respuesta, index) => {
      setOpciones[index](respuesta.textoRespuesta);
    });
  };

  useEffect(() => {
    getRespuestas();
  }, []);

  useEffect(() => {
    if (selected) {
      initializeOpciones();
    }
  }, [selected]);

  return (
    <div className="pregunta">
      <div className="dropdown">
        {!selected && <p className="titulo">{pregunta.textoPregunta}</p>}
        {selected && (
          <input
            className="titulopregunta"
            value={fpregunta}
            onChange={(e) => setFpregunta(e.target.value)}
            type="text"
          />
        )}
        <div class="pregIcon" onClick={timeOutOpen}>
          <FaArrowDown size={40} />
        </div>
      </div>
      {open && (
        <div className={showing ? "extension showing" : "extension hiding"}>
          <form className="respuestas">
            {respuestas &&
              respuestas.map((respuesta, index) => (
                <div className="respuesta" key={index}>
                  {!selected && (
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
                  )}
                  {selected && (
                    <>
                      <input
                        type="radio"
                        value={`opcion${index}`}
                        required
                        checked={selectedValue === `opcion${index}`}
                        onChange={handleOptionChange}
                      />
                      <input
                        className="opciones"
                        placeholder={`Opcion ${index + 1}`}
                        value={opciones[index]}
                        onChange={(e) => setOpciones[index](e.target.value)}
                        type="text"
                      />
                    </>
                  )}
                </div>
              ))}
          </form>

          <div className="iconsRespuesta">
            <div
              className="crudIcon"
              onClick={() => {
                handleSelected();
              }}
            >
              <FaEdit size={35} />
            </div>
            <div className="crudIcon">
              <MdCancel size={35} onClick={handleShow} />
            </div>
          </div>
        </div>
      )}
      <Modal show={show} onHide={handleClose} className="modal">
        <Modal.Header closeButton className="modaldetalles">
          <Modal.Title>
            ¿Estás seguro de que deseas eliminar esta pregunta?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modaldetalles tamanobody">
          No se podrá recuperar después
        </Modal.Body>
        <Modal.Footer className="modaldetalles">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="botonCancelar"
          >
            Cancelar
          </Button>
          <Button
            variant="secondary"
            onClick={() => deletePregunta()}
            className="botonEliminar"
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      {selected && (
        <p className="aviso">
          Asegúrate de llenar todos los campos y marcar una respuesta como
          correcta
          <input
            type="submit"
            value="Editar Preguntas"
            className="botonPreguntas"
            onClick={updatePregunta}
          />
        </p>
      )}
    </div>
  );
}
