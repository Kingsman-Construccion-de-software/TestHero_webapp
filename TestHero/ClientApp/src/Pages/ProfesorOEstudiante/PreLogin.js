import React from "react";
import "./prelogin.css";
import logo from "../../assets/logo.png";

/**
 * @author Leonardo García
 * @license GP
 * @version 1.0.1
 * Esta clase está dedicada a decidir si el usuario que va a entrar a
 * la página es de tipo estudiante o de tipo profesor
 */

export default function PreLogin() {
  return (
    <div>
      <div className="login">
        <div className="loginWrapper">
          <img src={logo} alt="Logo testHero" />
          <div className="estiloCentro">
            <button className="ButtonDouble">Soy Profesor</button>
          </div>
          <br></br>
          <div className="estiloCentro">
            <button className="ButtonDouble">Soy Alumno</button>
          </div>
        </div>
      </div>
    </div>
  );
}
