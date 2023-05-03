import React from "react";
import trigo from "../../assets/trigo.png";
import "./grupo.css";
export default function Grupo() {
  return (
    <div class="fondo">
      <div class="imagen">
        <img src={trigo} alt="Imagen de ejemplo" />
      </div>
      <div class="titulo">Examen de trigonometria</div>
      <div class="subtitulo">Grupo WWW</div>
      <div class="fecha">Disponible hasta el 26 de mayo del 2023</div>
    </div>
  );
}
