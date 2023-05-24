import styles from "./preguntasAlumno.css";
import SidebarAlumno from "components/sidebarAlumno/SidebarAlumno";
import { useState, useEffect } from "react";
import axios from "axios";
import PreguntaAlumno from "components/preguntaAlumno/PreguntaAlumno";
import { useSearchParams } from "react-router-dom";
/**
 * @author Bernardo de la Sierra
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Clase principal de crear preguntas
 */
export default function PreguntasAlumno() {
  // Estados iniciales
  const [examen, setExamen] = useState();
  const [preguntas, setPreguntas] = useState([]);
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
  /** Se obtiene las preguntas de un examen */
  const getPreguntas = async () => {
    try {
      const URIpreguntas = "api/pregunta/examen/" + searchParams.get("examen");
      const res = await axios.get(URIpreguntas);
      setPreguntas(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getExamen();
    getPreguntas();
  }, []);

  return (
    <div>
      <div>
        <SidebarAlumno />
      </div>
      <div className="page">
        <div className="content">
          <div className="preguntas">
            {preguntas.length === 0 && (
              <>
                <div className="vacio">
                  Comienza a crear preguntas para este examen.
                </div>
              </>
            )}
            {preguntas.map((pregunta, index) => (
              <PreguntaAlumno
                key={index}
                pregunta={pregunta}
                getPreguntas={getPreguntas}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
