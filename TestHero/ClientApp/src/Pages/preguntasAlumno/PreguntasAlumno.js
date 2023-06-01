import styles from "./preguntasAlumno.module.css";
import SidebarAlumno from "components/sidebarAlumno/SidebarAlumno";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PreguntaAlumno from "components/preguntaAlumno/PreguntaAlumno";
import { useSearchParams } from "react-router-dom";
import ProfesorContext from "context/contextoProfesor";
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
  const [alumnoRespuesta, setAlumnoRespuesta] = useState([]);
  const { state, setState } = useContext(ProfesorContext);
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
    }
  };

  useEffect(() => {
    getExamen();
    getPreguntas();
  }, []);

  const getAlumnoRespuesta = async () => {
    const url =
      "api/alumnopregunta/" + state.id + "/" + searchParams.get("examen");

    try {
      const result = await axios.get(url);
      setAlumnoRespuesta(result.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAlumnoRespuesta();
  }, [state]);
  return (
    <div>
      <div>
        <SidebarAlumno />
      </div>
      <div className={styles["page"]}>
        <div className={styles["content"]}>
          <div className={styles["preguntas"]}>
            {preguntas && alumnoRespuesta.length === 0 && (
              <>
                <div className={styles["vacio"]}>
                  Todavía no has resuelto este examen
                </div>
              </>
            )}
            {(preguntas &&
              preguntas.length > 0 &&
              alumnoRespuesta.length > 0) &&
              preguntas.map((pregunta, index) => {
                console.log(pregunta);
                return <PreguntaAlumno
                  key={index}
                  pregunta={pregunta}
                  alumnoRespuesta={alumnoRespuesta[index] != null ? alumnoRespuesta[index].idRespuesta : 0}
                />
}             )}
          </div>
        </div>
      </div>
    </div>
  );
}
