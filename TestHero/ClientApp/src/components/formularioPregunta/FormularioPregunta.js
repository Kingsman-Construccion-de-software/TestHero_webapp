import { useState } from "react";
import "./formularioPregunta.css";
import axios from "axios";

export default function FormularioPregunta({
  handleSelected,
  getPreguntas,
  idExamen,
}) {
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

  const creaPregunta = async (e) => {
    e.preventDefault();

    if (!selectedValue) {
      return;
    }

    const result = await axios.post(URIpregunta, {
      idExamen: idExamen,
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
      <form onSubmit={creaPregunta}>
        <div className="dropdown">
          <input
            className="titulopregunta"
            placeholder="Escribe la pregunta"
            value={fpregunta}
            required
            onChange={(e) => setFpregunta(e.target.value)}
            type="text"
          />
        </div>

        <div className="extension">
          <div className="respuestas">
            <div className="respuesta">
              <input
                type="radio"
                value="option0"
                required
                checked={selectedValue === "option0"}
                onChange={handleOptionChange}
              />
              <input
                className="opciones"
                placeholder="Opcion 1"
                value={opcion}
                required
                onChange={(e) => setOpcion(e.target.value)}
                type="text"
              />
            </div>
            <div className="respuesta" value="opción2">
              <input
                type="radio"
                value="option1"
                required
                checked={selectedValue === "option1"}
                onChange={handleOptionChange}
              />
              <input
                className="opciones"
                placeholder="Opcion 2"
                value={opcion2}
                required
                onChange={(e) => setOpcion2(e.target.value)}
                type="text"
              />
            </div>
            <div className="respuesta" value="opción3">
              <input
                type="radio"
                value="option2"
                required
                checked={selectedValue === "option2"}
                onChange={handleOptionChange}
              />
              <input
                className="opciones"
                placeholder="Opcion 3"
                value={opcion3}
                required
                onChange={(e) => setOpcion3(e.target.value)}
                type="text"
              />
            </div>
            <div className="respuesta" value="opción4">
              <input
                type="radio"
                value="option3"
                required
                checked={selectedValue === "option3"}
                onChange={handleOptionChange}
              />
              <input
                className="opciones"
                placeholder="Opcion 4"
                value={opcion4}
                required
                onChange={(e) => setOpcion4(e.target.value)}
                type="text"
              />
            </div>
          </div>
        </div>
        {!selectedValue && (
          <p className="aviso">
            Asegúrate de llenar todos los campos y marcar una respuesta como
            correcta
          </p>
        )}
        <input
          type="submit"
          value="Crear pregunta"
          className="botonPreguntas"
        />
      </form>
    </div>
  );
}
