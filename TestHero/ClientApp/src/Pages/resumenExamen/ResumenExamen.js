import styles from "./resumenExamen.module.css";
import Sidebar from "../../components/sidebar/Sidebar";

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
 * @description Clase principal de crear preguntas
 */
export default function ResumenExamen() {
  // Estados iniciales
  const [examen, setExamen] = useState();

  const [searchParams] = useSearchParams();

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
            <h2>Preguntas</h2>
            {examen && <h2>Código: {examen.codigo}</h2>}
          </div>
        </div>
      </div>
      <div>
        <div className="muevelo">
          <MultipleViewCard
            views={[
              { title: "Preguntas", component: <Questions /> },
              { title: "Resultados", component: <Results /> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
