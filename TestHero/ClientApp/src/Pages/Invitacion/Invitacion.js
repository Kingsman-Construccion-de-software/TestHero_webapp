import React, { useEffect, useState } from "react";
import styles from "./invitacion.module.css"
import { useContext } from "react";
import logoImage from "assets/logo.png"
import backGroundImage from "assets/fondo.jpg"
import { Link } from "react-router-dom"
import ProfesorContext from "context/contextoProfesor";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Invitacion() {

    const { state, setState } = useContext(ProfesorContext);
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState(false);
    const [searchParams] = useSearchParams();

    const getGrupo = async () => {
        let grupo = searchParams.get("grupo");
        const url = "api/grupo/" + grupo;
    
        try {
          const result = await axios.get(url);
          setNombre(result.data[0].nombre);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        getGrupo();
    }, []);
    

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
                {nombre && 
                <div className={styles['info-container']}>
                    <div>
                        <h2>Recibiste una invitación para:</h2>
                        <h3>{nombre}</h3>
                    </div>

                    { /* SUBMIT BUTTON */ }
                    <Link className={styles['submit-btn']} to={`/login/alumno?grupo=${searchParams.get("grupo")}`}>
                        <p className={styles['btn-link']}>Iniciar sesión</p>
                    </Link>
                </div>
                }
                {error &&
                    <div className={styles['info-container']}>
                    <div>
                        <h2>Esta invitación no es válida</h2>
                        <h3>Consúltalo con tu profesor</h3>
                    </div>
                </div>
                }

            </div>
        </div>
    )
}
