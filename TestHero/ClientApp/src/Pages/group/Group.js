import styles from "./group.module.css"
import Sidebar from "../../components/sidebar/Sidebar"
import ProfesorContext from "context/contextoProfesor";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function Group({edit}) {
    const {state, setState } = useContext(ProfesorContext);
    const [examenes, setExamenes] = useState([]);
    const [grupo, setGrupo] = useState();
    const navigate = useNavigate();

    const prefix = edit ? "/questions" : "/results";

    const goToCrearExamen = () => {
        navigate("/crear/examen?grupo=" + grupo.idGrupo)
    }

    const getGrupo = async () => {
        const url = "api/grupo/profesor/" + state.id;

        try {
            const result = await axios.get(url);
            if(result.data){
                setGrupo(result.data[0]);
            }
        } catch(error){
            alert(error);
        }
    }

    const getExamenesGrupo = async  () => {
        try {
            const url = "api/examen/grupo/" + grupo.idGrupo;
            const result = await axios.get(url);
            setExamenes([...result.data]);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getGrupo()
    }, [state.id]);

    useEffect(() => {
        getExamenesGrupo()
    }, [grupo]);


    return (
        <div className={styles.container}>
            <Sidebar/>
            <div className={styles.mainContent}>
                {grupo && <h1>{grupo.nombre}</h1>}
                <div className={styles['exams-list-header-container']}>
                    <h2>{edit ? "Editar exámenes" : "Resultados de exámenes"}</h2>
                    <input
                        className={styles['search-bar']}
                        type="search"
                        placeholder="Buscar"
                    />
                </div>
                <ul className={styles['exams-list']}>
                    {examenes && examenes.map((examen, idx) => {
                        return (
                            <li key={examen.idExamen} className={styles['exam-list-item'] + ` ${styles[`border-color-${idx % 3}`]}`}>
                                <Link to={`${prefix}?examen=${examen.idExamen}`}>{examen.nombre}</Link>
                            </li>
                        )
                    })}
                </ul>
                {edit && 
                    <div>
                        <button className={styles['action-button']} onClick={goToCrearExamen}>Crear nuevo examen</button>
                    </div>
                }
            </div>
        </div>
    )
}
