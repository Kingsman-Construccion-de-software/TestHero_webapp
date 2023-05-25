import styles from "./inicio.module.css"

import logoImage from "assets/logo.png"
import backGroundImage from "assets/fondo.jpg"

export default function Inicio() {
    return (
        <div className={styles['outer-container']}>
            <div className={styles.container}>
                { /* BACKGROUND IMAGE */ }
                <img className={styles['bg-image']} src={backGroundImage} />

                { /* LOGO IMAGE */}
                <div>
                    <img className={styles['logo-image']} src={logoImage} alt='Test Hero Logo' />
                </div>

                { /* INFO CONTAINER */}
                <div className={styles['info-container']}>
                    <div>
                        <span>Recibiste una invitación para:</span>
                        <span><h3>Matemáticas I</h3></span>
                    </div>

                    { /* SUBMIT BUTTON */ }
                    <button className={styles['submit-btn']}>
                            Iniciar sesión
                    </button>
                </div>
            </div>
        </div>
    )
}
