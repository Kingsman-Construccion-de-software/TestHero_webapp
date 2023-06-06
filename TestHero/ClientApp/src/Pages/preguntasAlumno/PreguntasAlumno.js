import styles from "./preguntasAlumno.module.css";
import SidebarAlumno from "components/sidebarAlumno/SidebarAlumno";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PreguntaAlumno from "components/preguntaAlumno/PreguntaAlumno";
import { useSearchParams } from "react-router-dom";
import ProfesorContext from "context/contextoProfesor";
import moment from "moment";

/**
 * @author Bernardo de la Sierra
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Clase principal de crear preguntas
 */
export default function PreguntasAlumno() {
  // Obtencion de la fecha de hoy
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("YYYY-MM-DDTHH:mm:ss");
  // Estados iniciales
  const [examen, setExamen] = useState();
  const [preguntas, setPreguntas] = useState([]);
  const [searchParams] = useSearchParams();
  const [alumnoRespuesta, setAlumnoRespuesta] = useState([]);
  const { state, setState } = useContext(ProfesorContext);
  const [checaFechas, setChecaFechas] = useState(false);
  const [formato, setFormato] = useState("");
  /**Checa que dado un idExmaen se pueda obtener todo su informacion */
  const getExamen = async () => {
    try {
      const url = "api/examen/" + searchParams.get("examen");
      const res = await axios.get(url);
      setExamen(res.data[0]);
      console.log(checaFechas);
      setChecaFechas(formattedDate <= res.data[0].fechaFin);
      console.log(checaFechas);
      setFormato(moment(res.data[0].fechaFin).format("MMMM D, YYYY h:mm A"));
    } catch (e) {
      console.log(e);
    }
  };
  /** Se obtiene las preguntas de un examen */
  const getPreguntas = async () => {
    try {
      const URIpreguntas = "api/pregunta/examen/" + searchParams.get("examen");
      const res = await axios.get(URIpreguntas);
      setPreguntas(res.data);
    } catch (error) {
      console.log(error);
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
      console.log(result.data);
    } catch (error) {
      console.log(error);
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
            <div>
              {checaFechas && alumnoRespuesta.length > 0 ? (
                <>
                  <div className={styles["vacio"]}>
                    El resultado se mostrará después de la fecha
                  </div>
                  <div className={styles["vacio"]}> {formato}</div>
                </>
              ) : (
                <>
                  {preguntas &&
                    preguntas.length > 0 &&
                    alumnoRespuesta.length > 0 &&
                    preguntas.map((pregunta, index) => {
                      console.log(alumnoRespuesta);
                      return (
                        <PreguntaAlumno
                          key={index}
                          pregunta={pregunta}
                          alumnoRespuesta={
                            alumnoRespuesta[index] !== null
                              ? alumnoRespuesta[index].idRespuesta
                              : 0
                          }
                        />
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
