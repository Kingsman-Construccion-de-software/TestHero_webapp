import styles from "./questions.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Pregunta from "../../components/pregunta/Pregunta";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Questions() {
  const [preguntas, setPreguntas] = useState([]);

  const URIpreguntas = "api/pregunta/examen/1";

  const getPreguntas = async () => {
    const res = await axios.get(URIpreguntas);
    setPreguntas(res.data);
  };

  useEffect(() => {
    getPreguntas();
  }, []);

  const filterPreguntas = (id) => {
    setPreguntas(preguntas.filter((pregunta) => pregunta.idPregunta !== id));
  };

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="page">
        <div className="content">
          <h1 className="tituloExamen">Examen de trigonometría</h1>
          <div className="subtitles">
            <h2>Preguntas</h2>
            <h2>Código: 13467942</h2>
          </div>
          <div className="preguntas">
            {preguntas.map((preguntas, index) => (
              <Pregunta
                key={index}
                preguntas={preguntas}
                filterPreguntas={filterPreguntas}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
