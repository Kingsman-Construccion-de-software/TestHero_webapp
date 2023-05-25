import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./resumen.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

import { useSearchParams } from "react-router-dom";
import MultipleViewCard from "components/multiple-view-card/MultipleViewCard";
import Questions from "Pages/questions/questions";
import Results from "Pages/results/Results";
/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Clase que renderea los componentes
 */
export default function ResumenExamen() {
  // Estados iniciales
  const [examen, setExamen] = useState();

  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const [searchParams] = useSearchParams();

  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  /**Checa que daod un idExmaen se pueda obtener todo su informacion */
  const getExamen = async () => {
    try {
      const url = "api/examen/" + searchParams.get("examen");
      const res = await axios.get(url);
      setExamen(res.data[0]);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getExamen();
  }, []);

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="page">
        <div className="content">
          {examen && <h1 className="tituloExamen">{examen.nombre}</h1>}
          <div className="subtitles">
            <div className="SuperiorLeft">
              {examen && (
                <h2 className={styles["mover"]}>Código: {examen.codigo}</h2>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <MultipleViewCard
          views={[
            { title: "Preguntas", component: <Questions /> },
            {
              title: "Resultados",
              component: <Results codigos={examen} />,
            },
          ]}
        />
      </div>
    </div>
  );
}
