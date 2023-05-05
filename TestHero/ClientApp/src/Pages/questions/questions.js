import styles from "./questions.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Pregunta from "../../components/pregunta/Pregunta";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPlusCircleFill } from "react-icons/bs";
import FormularioPregunta from "../../components/formularioPregunta/FormularioPregunta";
import { useSearchParams } from "react-router-dom";

export default function Questions() {
  const [examen, setExamen] = useState();
  const [preguntas, setPreguntas] = useState([]);
  const [selected, setSelected] = useState(false);
  const [searchParams] = useSearchParams();

  const handleSelected = () => {
    setSelected(!selected);
  };

  const getExamen = async () => {
    try {
      const url = "api/examen/" + searchParams.get("examen");
      const res = await axios.get(url);
      setExamen(res.data[0]);
    } catch (e) {
      alert(e);
    }
  };

  const getPreguntas = async () => {
    const URIpreguntas = "api/pregunta/examen/" + examen.idExamen;
    const res = await axios.get(URIpreguntas);
    setPreguntas(res.data);
  };

  useEffect(() => {
    getExamen();
  }, []);

  useEffect(() => {
    getPreguntas();
  }, [examen]);

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
          {examen && <h1 className="tituloExamen">{examen.nombre}</h1>}
          <div className="subtitles">
            <h2>Preguntas</h2>
            {examen && <h2>Código: {examen.codigo}</h2>}
          </div>
          <div className="preguntas">
            {preguntas.map((pregunta, index) => (
              <Pregunta
                key={index}
                pregunta={pregunta}
                filterPreguntas={filterPreguntas}
                getPreguntas={getPreguntas}
              />
            ))}
            {selected && (
              <FormularioPregunta
                handleSelected={handleSelected}
                getPreguntas={getPreguntas}
                idExamen={examen.idExamen}
              />
            )}
          </div>
        </div>

        <div
          onClick={() => {
            handleSelected();
          }}
        >
          {!selected && <BsFillPlusCircleFill className="circulo" />}
        </div>
      </div>
    </div>
  );
}
