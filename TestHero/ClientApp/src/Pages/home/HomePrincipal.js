import React, { Component } from "react";
// import React, { useRef } from "react";
import "./home.css";
// import logo from "../../assets/logo.png";
import UserIcon from "../../assets/UserIcon.png";
import Sidebar from "../../components/Sidebar.js";

/**
 * @author: Leonardo García
 * @license: GP
 * @version: 1.0.0
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
        <center>
          <img class="icono" src={UserIcon} alt="icono de usuario" />
        </center>
        <div class="col"></div>
        <h4>Gerardo Ramírez</h4>
      </div>
    </div>
  );
}
