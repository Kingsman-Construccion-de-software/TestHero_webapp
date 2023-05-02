import React from "react";
// import React, { useRef } from "react";
import "./home.css";
// import logo from "../../assets/logo.png";
import UserIcon from "../../assets/UserIcon.png";
import Sidebar from "../../components/Sidebar.js";
import Grupo from "../../components/grupo/Grupo";

/**
 * @author: Leonardo García y Bernardo de la Sierra
 * @license: GP
 * @version: 2.0.0
 * Esta clase está dedicada a la página de home
 */

export default function HomePrincipal() {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div class="home_background">
        <div class="titulo">¡Bienvenido!</div> {/* inserte nombre*/}
        <div>
          <img class="icono" src={UserIcon} alt="icono de usuario" />
          <span>Gerardo Ramírez</span>
        </div>
        <Grupo />
      </div>
    </div>
  );
}
