import { useState, useEffect } from "react";
import "./formularioPregunta.css";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function FormularioPregunta({
  handleSelected,
  getPreguntas,
  preguntas,
}) {
  const [fpregunta, setFpregunta] = useState("");
  const [opcion, setOpcion] = useState("");
  const [opcion2, setOpcion2] = useState("");
  const [opcion3, setOpcion3] = useState("");
  const [opcion4, setOpcion4] = useState("");

  const URIpregunta = "api/pregunta";
  const creaPregunta = async () => {
    await axios.post(URIpregunta, { idExamen: 1, textoPregunta: fpregunta });
    getPreguntas();
    handleSelected();
  };
  return (
    <div className="pregunta">
      <div className="dropdown">
        <input
          className="titulopregunta"
          placeholder="Escribe la pregunta"
          value={fpregunta}
          onChange={(e) => setFpregunta(e.target.value)}
          type="text"
        />
      </div>

      <div className="extension">
        <form className="respuestas">
          <div className="respuesta">
            <input type="radio" name="opciónPregunta1" value="opcion0" />
            <input
              className="opciones"
              placeholder="Opcion 1"
              value={opcion}
              onChange={(e) => setOpcion(e.target.value)}
              type="text"
            />
          </div>
          <div className="respuesta" value="opción2">
            <input type="radio" name="opcion1" />
            <input
              className="opciones"
              placeholder="Opcion 2"
              value={opcion2}
              onChange={(e) => setOpcion2(e.target.value)}
              type="text"
            />
          </div>
          <div className="respuesta" value="opción3">
            <input type="radio" name="opcion2" />
            <input
              className="opciones"
              placeholder="Opcion 3"
              value={opcion3}
              onChange={(e) => setOpcion3(e.target.value)}
              type="text"
            />
          </div>
          <div className="respuesta" value="opción4">
            <input type="radio" name="opcion3" />
            <input
              className="opciones"
              placeholder="Opcion 4"
              value={opcion4}
              onChange={(e) => setOpcion4(e.target.value)}
              type="text"
            />
          </div>
        </form>
      </div>
      <Button
        variant="secondary"
        className="botonCancelar"
        onClick={() => creaPregunta()}
      >
        Crear pregunta
      </Button>
    </div>
  );
}
