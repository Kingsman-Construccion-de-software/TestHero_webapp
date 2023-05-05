import React from "react";
import "./grupo.css";
export default function Grupo({nombre, fechaFin, grupo}) {
  return (
    <div className="fondo">
      <div className="imagenGrupo"></div>
      <div className="infoGrupo">
        <div className="tituloCard">{nombre}</div>
        <div className="subtitulo">{grupo}</div>
        <div className="fecha">Disponible hasta el {fechaFin.substring(0, 10)}</div>
      </div>
    </div>
  );
}
