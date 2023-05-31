import React from "react";
import styles from "./prelogin.module.css";
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
            <div className={styles['login']}>
                <div className={styles['loginWrapper']}>
                    <img src={logo} alt="Logo testHero" />
                    <Link to={`/login/profesor`}>
                        <div className={styles['estiloCentro']}>
                            <button className={styles['ButtonDouble']}>Soy Profesor</button>
                        </div>
                    </Link>
                    <br></br>
                    <Link to={`/login/alumno`}>
                        <div className={styles['estiloCentro']}>
                            <button className={styles['ButtonDouble']}>Soy Alumno</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}