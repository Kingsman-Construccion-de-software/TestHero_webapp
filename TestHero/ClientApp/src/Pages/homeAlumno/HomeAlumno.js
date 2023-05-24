import React, { useState } from "react";
// import React, { useRef } from "react";
import "./homealumno.css";
// import logo from "../../assets/logo.png";
import UserIcon from "../../assets/UserIcon.png";
import SidebarAlumno from "../../components/sidebarAlumno/SidebarAlumno";
import GrupoAlumno from "components/grupoAlumno/GrupoAlumno";
import { useContext, useEffect } from "react";
import ProfesorContext from "context/contextoProfesor";
import axios from "axios";

/**
 * @author: Bernardo de la Sierra
 * @license: GP
 * @version: 2.0.0
 * Esta clase está dedicada a la página de home
 */

export default function HomeAlumno() {
  const { state, setState } = useContext(ProfesorContext);
  const [examenes, setExamenes] = useState([]);

  const getExamenesActivos = async () => {
    const url = "api/alumno/examenes/" + state.id;

    try {
      const result = await axios.get(url);
      setExamenes([...result.data]);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getExamenesActivos();
  }, [state.id]);

  return (
    <div>
      <div>
        <SidebarAlumno />
      </div>
      <div className="home_background">
        <h1 className="tituloPagina">¡Bienvenido!</h1>
        <div className="datos">
          <img className="icono" src={UserIcon} alt="icono de usuario" />
          <span className="nombreUsuario">{state.nombre}</span>
        </div>
        <div className="examActuales">
          {examenes &&
            examenes.map((examen) => (
              <GrupoAlumno
                key={examen.idExamen}
                nombre={examen.nombre}
                fechaFin={examen.fechaFin}
                link={`/resumenAlumno?examen=${examen.idExamen}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
