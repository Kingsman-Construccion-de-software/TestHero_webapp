import React from "react";
import { FaArrowDown, FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./Pregunta.css";


export default function Pregunta({ pregunta, filterPreguntas }) {
  const [open, setOpen] = useState(false);
  const [showing, setSbowing] = useState(false);
  const [show, setShow] = useState(false);

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

  const [respuestas, setRespuestas] = useState([]);

  const URIrespuestas = "api/respuesta/pregunta/";

  const getRespuestas = async () => {
    const res = await axios.get(`${URIrespuestas}${pregunta.idPregunta}`);
    setRespuestas(res.data);
  };

  const URIdelete = "api/pregunta/";

  const deletePregunta = async () => {
    await axios.delete(`${URIdelete}${pregunta.idPregunta}`);
    filterPreguntas(pregunta.idPregunta);
    getRespuestas();
    handleClose();
  };

  useEffect(() => {
    getRespuestas();
  }, []);

  console.log(respuestas);

  return (
    <div className="pregunta">
      <div className="dropdown">
        <p className="titulo">{pregunta.textoPregunta}</p>
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

                  <p>{respuesta.textoRespuesta}</p>
                </div>
              ))}
          </form>
          <div className="iconsRespuesta">
            <div className="crudIcon">
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
    </div>
  );
}
