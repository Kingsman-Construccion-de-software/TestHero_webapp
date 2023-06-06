import React, { useState } from "react";
import styles from "./homealumno.module.css";
import UserIcon from "../../assets/UserIcon.png";
import SidebarAlumno from "../../components/sidebarAlumno/SidebarAlumno";
import GrupoAlumno from "components/grupoAlumno/GrupoAlumno";
import { useContext, useEffect } from "react";
import ProfesorContext from "context/contextoProfesor";
import axios from "axios";
import swal from "sweetalert";

/**
 * @author: Bernardo de la Sierra
 * @license: GP
 * @version: 2.0.0
 * Esta clase está dedicada a la página de home
 */

export default function HomeAlumno() {
  const { state, setState } = useContext(ProfesorContext);
  const [examenes, setExamenes] = useState([]);
  const [grupo, setGrupo] = useState();

  const getExamenesActivos = async () => {
    const url = "api/alumno/examenes/" + state.id;

    try {
      const result = await axios.get(url);
      setExamenes(result.data);
    } catch (error) {}
  };

  const getGrupos = async () => {
    if (state.idGrupo !== -1) {
      const url = "api/grupo/alumnos/" + state.id;
      try {
        const result = await axios.get(url);
        if (result.data.length === 0) {
          addToGrupo(state.id, state.idGrupo);
        } else {
          setGrupo(result.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addToGrupo = async (idAlumno, idGrupo) => {
    try {
      const url = "api/grupo/" + idGrupo + "/alumno/" + idAlumno;
      const result = await axios.post(url);
      setState({
        ...state,
        idGrupo: idGrupo,
      });
      swal({
        title: "Has sigo agregado a un grupo",
        button: "Aceptar",
        icon: "info",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExamenesActivos();
    getGrupos();
  }, [state]);

  return (
    <div>
      <div>
        <SidebarAlumno />
      </div>
      <div className={styles.home_background}>
        <h1 className={styles.tituloPagina}>¡Bienvenido!</h1>
        <div className={styles.datos}>
          <img className={styles.icono} src={UserIcon} alt="icono de usuario" />
          <div className={styles.datosAlumno}>
            <span className={styles.nombreUsuario}>{state.nombre}</span>
            {grupo && (
              <span className={styles.nombreUsuario}>
                Grupo: {grupo.nombre}
              </span>
            )}
          </div>
        </div>
        <div className={styles.examActuales}>
          {!grupo && (
            <p className={styles.vacio}>
              Aún no eres miembro de ningún grupo. Consúltalo con tu profesor.
            </p>
          )}
          {grupo &&
            examenes.length > 0 &&
            examenes.map((examen) => (
              <GrupoAlumno
                key={examen.idExamen}
                nombre={examen.nombre}
                fechaFin={examen.fechaFin}
                link={`/resumen/alumno?examen=${examen.idExamen}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
