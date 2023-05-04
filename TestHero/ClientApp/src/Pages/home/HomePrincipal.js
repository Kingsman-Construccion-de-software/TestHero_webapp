import React from "react";
// import React, { useRef } from "react";
import "./home.css";
// import logo from "../../assets/logo.png";
import UserIcon from "../../assets/UserIcon.png";
import Sidebar from "../../components/sidebar/Sidebar.js";
import Grupo from "../../components/grupo/Grupo";
import { useContext } from "react";
import ProfesorContext from "context/contextoProfesor";


/**
 * @author: Leonardo García y Bernardo de la Sierra
 * @license: GP
 * @version: 2.0.0
 * Esta clase está dedicada a la página de home
 */

export default function HomePrincipal() {
  const {state, setState } = useContext(ProfesorContext);

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="home_background">
        <h1 className="tituloPagina">¡Bienvenido!</h1> 
        <div className="datos">
          <img className="icono" src={UserIcon} alt="icono de usuario" />
          <span className="nombreUsuario">{state.nombre}</span>
        </div>
        <div className="examActuales">
          <Grupo />
          <Grupo />
          <Grupo />
        </div>
      </div>
    </div>
  );
}
