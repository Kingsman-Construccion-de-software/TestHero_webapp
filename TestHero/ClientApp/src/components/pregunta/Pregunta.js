import React from "react";
import "./Pregunta.css";
import { FaArrowDown, FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function Pregunta({ preguntas }) {
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
    const res = await axios.get(`${URIrespuestas}${preguntas.idPregunta}`);
    setRespuestas(res.data);
  };

  useEffect(() => {
    getRespuestas();
  }, []);

  console.log(respuestas);

  return (
    <div className="pregunta">
      <div className="dropdown">
        <p className="titulo">{preguntas.textoPregunta}</p>
        <div class="pregIcon" onClick={timeOutOpen}>
          <FaArrowDown size={40} />
        </div>
      </div>
      {open && (
        <div className={showing ? "extension showing" : "extension hiding"}>
          <form className="respuestas">
            {respuestas &&
              respuestas.map((respuestas, index) => (
                <div className="respuesta" key={index}>
                  <input
                    type="radio"
                    name={`opcion${index}`}
                    value={`opcion${index}`}
                  />
                  <p>{respuestas.textoRespuesta}</p>
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
            onClick={handleClose}
            className="botonEliminar"
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
