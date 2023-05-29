import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { BiCheck, BiX } from "react-icons/bi";
import "./preguntaAlumno.css";

/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 3.1.1
 * @license Gp
 * @params Recibe pregunta, filtraprefuntas y getpreguntas
 * @description Este formulario edita y elimina preguntas, es como la parte de adentro
 */
export default function PreguntaAlumno({ pregunta, alumnoRespuesta }) {
  // Aparicio de datos
  const [open, setOpen] = useState(false);
  const [showing, setShowing] = useState(false);

  const [correcta, setCorrecta] = useState(false);

  const [respuestas, setRespuestas] = useState([]);
  const [actionable, setActionable] = useState(true);
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

  /**
   *Funcion para obtener todas las respuestas
   */
  const getRespuestas = async () => {
    const URIrespuestas = "api/respuesta/pregunta/";
    try {
      const result = await axios.get(`${URIrespuestas}${pregunta.idPregunta}`);
      setRespuestas(result.data);
      result.data.forEach((el) => {
        if (el.esCorrecta === 1) {
          setCorrecta(el.idRespuesta === alumnoRespuesta);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getRespuestas();
  }, []);

  return (
    <div className="pregunta">
      <div className="dropdown">
        <p className="titulo">{pregunta.textoPregunta}</p>
        <div className="iconosalumno">
          <div className="bienomal">
            {correcta ? <BiCheck size={60} /> : <BiX size={60} />}
          </div>
          <div class="pregIcon" onClick={timeOutOpen}>
            <FaArrowDown size={40} />
          </div>
        </div>
      </div>
      {open && (
        <div className={showing ? "extension showing" : "extension hiding"}>
          <form className="respuestas">
            {respuestas &&
              respuestas.map((respuesta, index) => (
                <div className="respuesta" key={index}>
                  <>
                    {respuesta.idRespuesta === alumnoRespuesta ? (
                      <input type="radio" checked />
                    ) : (
                      <input disabled type="radio" />
                    )}
                    <p>{respuesta.textoRespuesta} </p>
                  </>
                </div>
              ))}
          </form>
        </div>
      )}
    </div>
  );
}
