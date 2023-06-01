import React from "react";
import styles from "./invitacion.module.css"

import logoImage from "assets/logo.png"
import backGroundImage from "assets/fondo.jpg"
import { Link } from "react-router-dom"

export default function Invitacion() {
    return (
        <div className={styles['outer-container']}>
            <div className={styles.container}>
                { /* BACKGROUND IMAGE */ }
                <img className={styles['bg-image']} src={backGroundImage} alt="icon"/>

                { /* LOGO IMAGE */}
                <div>
                    <img className={styles['logo-image']} src={logoImage} alt='Test Hero Logo' />
                </div>

                { /* INFO CONTAINER */}
                <div className={styles['info-container']}>
                    <div>
                        <h2>Recibiste una invitación para:</h2>
                        <h3>Matemáticas I</h3>
                    </div>

                    { /* SUBMIT BUTTON */ }
                    <Link className={styles['submit-btn']} to="/login/alumno">
                        <p className={styles['btn-link']}>Iniciar sesión</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
