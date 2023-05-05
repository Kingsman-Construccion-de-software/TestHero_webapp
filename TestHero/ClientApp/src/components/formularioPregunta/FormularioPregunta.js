import { useState } from "react";
import "./formularioPregunta.css";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function FormularioPregunta({ handleSelected, getPreguntas }) {
  const [fpregunta, setFpregunta] = useState("");
  const [opcion, setOpcion] = useState("");
  const [opcion2, setOpcion2] = useState("");
  const [opcion3, setOpcion3] = useState("");
  const [opcion4, setOpcion4] = useState("");

  const [selectedValue, setSelectedValue] = useState("");

  const handleOptionChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const URIpregunta = "api/pregunta";
  const URIrespuesta = "api/respuesta";
  const creaPregunta = async () => {
    const result = await axios.post(URIpregunta, {
      idExamen: 1,
      textoPregunta: fpregunta,
    });

    const data1 = {
      TextoRespuesta: opcion,
      EsCorrecta: 0,
      idPregunta: result.data.idPregunta,
    };
    const data2 = {
      TextoRespuesta: opcion2,
      EsCorrecta: 0,
      idPregunta: result.data.idPregunta,
    };

    const data3 = {
      TextoRespuesta: opcion3,
      EsCorrecta: 0,
      idPregunta: result.data.idPregunta,
    };
    const data4 = {
      TextoRespuesta: opcion4,
      EsCorrecta: 0,
      idPregunta: result.data.idPregunta,
    };

    if (selectedValue === "option0") {
      data1.EsCorrecta = 1;
    } else if (selectedValue === "option1") {
      data2.EsCorrecta = 1;
    } else if (selectedValue === "option2") {
      data3.EsCorrecta = 1;
    } else if (selectedValue === "option3") {
      data4.EsCorrecta = 1;
    }

    await axios.post(URIrespuesta, data1);
    await axios.post(URIrespuesta, data2);
    await axios.post(URIrespuesta, data3);
    await axios.post(URIrespuesta, data4);

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
            <input
              type="radio"
              value="option0"
              checked={selectedValue === "option0"}
              onChange={handleOptionChange}
            />
            <input
              className="opciones"
              placeholder="Opcion 1"
              value={opcion}
              onChange={(e) => setOpcion(e.target.value)}
              type="text"
            />
          </div>
          <div className="respuesta" value="opción2">
            <input
              type="radio"
              value="option1"
              checked={selectedValue === "option1"}
              onChange={handleOptionChange}
            />
            <input
              className="opciones"
              placeholder="Opcion 2"
              value={opcion2}
              onChange={(e) => setOpcion2(e.target.value)}
              type="text"
            />
          </div>
          <div className="respuesta" value="opción3">
            <input
              type="radio"
              value="option2"
              checked={selectedValue === "option2"}
              onChange={handleOptionChange}
            />
            <input
              className="opciones"
              placeholder="Opcion 3"
              value={opcion3}
              onChange={(e) => setOpcion3(e.target.value)}
              type="text"
            />
          </div>
          <div className="respuesta" value="opción4">
            <input
              type="radio"
              value="option3"
              checked={selectedValue === "option3"}
              onChange={handleOptionChange}
            />
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
