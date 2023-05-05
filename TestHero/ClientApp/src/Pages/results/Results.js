import styles from "./results.module.css"
import Sidebar from "../../components/sidebar/Sidebar"

// Icons
import userIcon from "../../assets/UserIcon.png"
import ProfesorContext from "context/contextoProfesor";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Results() {

    const {state, setState } = useContext(ProfesorContext);
    const [searchParams] = useSearchParams();
    const [examen, setExamen] = useState();
    const [calificaciones, setCalificaciones] = useState();

    const getExamen = async () => {
        const url = "api/examen/" + searchParams.get("examen");

        try {
            const result = await axios.get(url);
            if(result.data){
                setExamen(result.data[0]);
                console.log(result.data[0]);
            }
        } catch(error){
            alert(error);
        }
    }

    const getCalificaciones = async  () => {
        try {
            const url = "api/alumno/examen/" + examen.idExamen;
            const result = await axios.get(url);
            setCalificaciones([...result.data]);
            console.log(result.data);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getExamen();
    }, []);

    useEffect(() => {
        getCalificaciones();
    }, [examen]);


    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                {examen && <h1>{examen.nombre}</h1>}
                <div className={styles.header}>
                    <input
                        className={styles['search-bar']}
                        type="search"
                        placeholder="Buscar"
                    />
                </div>
                <ul className={styles.table}>
                    <li className={styles.row + ' ' + styles['row-colored']}>
                        <span></span>
                        <span className={styles['table-title']}>Nombre(s)</span>
                        <span className={styles['table-title']}>Apellido(s)</span>
                        <span className={styles['table-title']}>Calificación</span>
                    </li>
                    {calificaciones &&
                        calificaciones.map((el, idx) => (
                            <li className={styles.row + `${idx % 2 !== 0 ? ` ${styles['row-colored']}` : ''}`}>
                                <img src={userIcon} alt="foto" />
                                <span>{el.nombres}</span>
                                <span>{el.apellidos}</span>
                                <span>{el.calificacion}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
