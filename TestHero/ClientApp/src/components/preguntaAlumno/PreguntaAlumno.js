import React from "react";
import { FaArrowDown, FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./preguntaAlumno.css";
import swal from "sweetalert";
import { isRegularExpressionLiteral } from "typescript";
/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 3.1.1
 * @license Gp
 * @params Recibe pregunta, filtraprefuntas y getpreguntas
 * @description Este formulario edita y elimina preguntas, es como la parte de adentro
 */
export default function PreguntaAlumno({
  pregunta,
  filterPreguntas,
  getPreguntas,
}) {
  // Aparicio de datos
  const [open, setOpen] = useState(false);
  const [showing, setShowing] = useState(false);
  const [actionable, setActionable] = useState(true);
  const [selected, setSelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
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
    if(actionable){
      setActionable(false);
      setShowing(!showing);
      if (open) {
        setTimeout(toggleOpen, 1000);
      } else {
        toggleOpen();
      }
    }
  };

  /**
   *Funcion para obtener todas las respuestas
   */
  const getRespuestas = async () => {
    const URIrespuestas = "api/respuesta/pregunta/";
    const res = await axios.get(`${URIrespuestas}${pregunta.idPregunta}`);
    setRespuestas(res.data);
  };

  /**
   * Actualiza una respuesta dado un idPregunta
   */
  const updateRespuesta = async (respuesta, idx) => {
    const URIupdateP = "api/respuesta/";
    console.log(respuesta);
    await axios.put(`${URIupdateP}${respuestas[idx].idRespuesta}`, respuesta);
  };
  /**
   * Funcion para activar el punto al crear una respueta
   */
  const initializeOpciones = () => {
    if (selectedValue === "opcion0") {
      respuestas[0].esCorrecta = 1;
    } else if (selectedValue === "opcion1") {
      respuestas[1].esCorrecta = 1;
    } else if (selectedValue === "opcion2") {
      respuestas[2].sCorrecta = 1;
    } else if (selectedValue === "opcion3") {
      respuestas[3].EsCorrecta = 1;
    }

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
                </div>
              ))}
          </form>
        </div>
      )}
    </div>
  );
}
