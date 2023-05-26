import SidebarAlumno from "components/sidebarAlumno/SidebarAlumno";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./resumenAlumno.module.css";
import { useSearchParams } from "react-router-dom";
import ProfesorContext from "context/contextoProfesor";
import PreguntasAlumno from "Pages/preguntasAlumno/PreguntasAlumno";
/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Clase que renderea los componentes
 */
export default function ResumenAlumno() {
  // Estados iniciales
  const [examen, setExamen] = useState();
  const [puntaje, setPuntaje] = useState(0);
  const { state, setState } = useContext(ProfesorContext);
  const [searchParams] = useSearchParams();
  const parametros = searchParams.get("examen");

  /**Checa que daod un idExamen se pueda obtener todo su informacion */
  const getExamen = async () => {
    try {
      const url = "api/examen/" + searchParams.get("examen");
      const res = await axios.get(url);
      setExamen(res.data[0]);
    } catch (e) {
      alert(e);
    }
  };

  const getCalificacion = async () => {
    try {
      const url = `api/alumno/examen/${parametros}/${state.id}`;
      const res = await axios.get(url);
      setPuntaje(res.data[0].calificacion);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExamen();
    getCalificacion();
  }, []);

  return (
    <div>
      <div>
        <SidebarAlumno />
      </div>
      <div className="page">
        <div className="content">
          {examen && <h1 className="tituloExamen">{examen.nombre}</h1>}
          <div className="subtitles">
            {examen && <h2>Código: {examen.codigo}</h2>}
          </div>
          <br />
          <br />
          <div className="subtitles">
            <h2>Calificación: {puntaje}</h2>
          </div>
        </div>
      </div>
      <div>
        <PreguntasAlumno />
      </div>
    </div>
  );
}
