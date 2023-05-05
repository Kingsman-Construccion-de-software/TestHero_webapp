import React from "react";
import "./grupo.css";
import { useNavigate } from "react-router-dom";
export default function Grupo({nombre, fechaFin, grupo, link}) {
  const navigate = useNavigate();

  const goToExamen = () => {
    navigate(link);
  }

  return (
    <div className="fondo" onClick={goToExamen}>
      <div className="imagenGrupo"></div>
      <div className="infoGrupo">
        <div className="tituloCard">{nombre}</div>
        <div className="subtitulo">{grupo}</div>
        <div className="fecha">Disponible hasta el {fechaFin.substring(0, 10)}</div>
      </div>
    </div>
  );
}
