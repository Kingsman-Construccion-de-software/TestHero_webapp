import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./resumenexamen.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useSearchParams, useNavigate } from "react-router-dom";
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

  const [text, setText] = useState("https://localhost:44423/examenAlumno");

  const inputRef = useRef(null);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const getExamen = async () => {
    try {
      const url = "api/examen/" + searchParams.get("examen");
      const res = await axios.get(url);
      setExamen(res.data[0]);
    } catch (e) {
      alert(e);
    }
  };

  const deleteExam = async () => {
      const url = "api/examen/" + examen.idExamen;
      try {
          const res = await axios.get(url);
          console.log(res);
      } catch (e) {
          alert(e);
      }
  }

  const EditExam = () => {
    navigate("/editar/examen");
  };

  console.log(examen);

  useEffect(() => {
    getExamen();
  }, []);

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className={styles["page"]}>
        <div className={styles["content"]}>
          {examen && (
            <div className={styles["title-row"]}>
              <h1 className={styles["tituloExamen"]}>{examen.nombre}</h1>
            </div>
          )}
          <div className={styles["subtitles"]}>
            {examen && (
              <h2 className={styles['subtitle']}>Código: {examen.codigo}</h2>
            )}
              <button onClick={EditExam}>Editar</button>
              <button onClick={deleteExam}>Eliminar exámen</button>
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
