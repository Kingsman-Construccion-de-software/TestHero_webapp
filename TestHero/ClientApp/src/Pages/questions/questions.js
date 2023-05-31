import styles from "./questions.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Pregunta from "../../components/pregunta/Pregunta";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPlusCircleFill } from "react-icons/bs";
import FormularioPregunta from "../../components/formularioPregunta/FormularioPregunta";
import { useSearchParams } from "react-router-dom";
/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Clase principal de crear preguntas
 */
export default function Questions() {
  // Estados iniciales
  const [examen, setExamen] = useState();
  const [preguntas, setPreguntas] = useState([]);
  const [selected, setSelected] = useState(false);
  const [searchParams] = useSearchParams();
  /**Checa que esta seleccionado el boton de crear para desplegar el modal */
  const handleSelected = () => {
    setSelected(!selected);
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
  }, []);

  useEffect(() => {
    getPreguntas();
  }, [examen]);
  /**Filtramos las preguntas dado un idPregunta para actualizar el flujo de las preguntas */
  const filterPreguntas = (id) => {
    setPreguntas(preguntas.filter((pregunta) => pregunta.idPregunta !== id));
  };

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className={styles["page"]}>
        <div className={styles["content"]}>
          <div className={styles["preguntas"]}>
            {preguntas.length === 0 && (
              <>
                <div className={styles["vacio"]}>
                  Comienza a crear preguntas para este examen.
                </div>
              </>
            )}
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
          {!selected && <BsFillPlusCircleFill className={styles["circulo"]} />}
        </div>
      </div>
    </div>
  );
}
