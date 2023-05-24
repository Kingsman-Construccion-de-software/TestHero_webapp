import React from "react";
import "./prelogin.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
/**
 * @author Leonardo García y Bernardo de la Sierra Rábago
 * @license GP
 * @version 1.1.0
 * Esta clase se encargada de redirijir al estudiante o profesor a su
 * respectivo sitio
 */

export default function PreLogin() {
    return (
        <div>
            <div className="login">
                <div className="loginWrapper">
                    <img src={logo} alt="Logo testHero" />
                    <Link to={`/loginprofesor`}>
                        <div className="estiloCentro">
                            <button className="ButtonDouble">Soy Profesor</button>
                        </div>
                    </Link>
                    <br></br>
                    <Link to={`/loginalumno`}>
                        <div className="estiloCentro">
                            <button className="ButtonDouble">Soy Alumno</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}