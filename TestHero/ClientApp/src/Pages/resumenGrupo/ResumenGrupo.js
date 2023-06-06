import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MultipleViewCard from "components/multiple-view-card/MultipleViewCard";
import Group from "Pages/examenesProfesor/ExamGrupo";
import Alumno from "Pages/alumno/Alumno";
import styles from "./resumengrupo.module.css";
import swal from "sweetalert";

/**
 * @author Bernardo de la Sierra y Julio Meza (LGnan puso una á en Exámenes)
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Clase que renderea los componentes
 */
export default function ResumenGrupo() {
    const [grupo, setGrupo] = useState();
    const [text, setText] = useState("");
    const inputRef = useRef(null);

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const [searchParams] = useSearchParams();
    const parametro = searchParams.get("grupo");

    const getGrupo = async () => {
        const url = `api/grupo/${parametro}`;

        try {
            const result = await axios.get(url);
            if (result.data) {
                setGrupo(result.data[0]);
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        getGrupo();
    }, []);

    const handleCopyButtonClick = () => {
        const text = inputRef.current.value;
        if (text) {
            navigator.clipboard.writeText(text);
            swal({
                title: "Se ha copiado el link para compartir el grupo",
                button: "Aceptar",
                icon: "success",
              });
        }
    };

    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div className={styles["page"]}>
                <div className={styles["content"]}>
                    {grupo && (
                        <div className={styles["title-row"]}>
                            <h1 className={styles["tituloExamen"]}>{grupo.nombre}</h1>
                            <div className={styles["input-row"]}>
                                <input
                                    type="text"
                                    ref={inputRef}
                                    disabled
                                    defaultValue={`https://localhost:44423/invitacion?grupo=${grupo.idGrupo}`}
                                    className={styles["input-text"]}
                                />
                                <button onClick={handleCopyButtonClick} className={styles["copy-button"]}>
                                    Copiar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div className={styles["muevelo"]}>
                    <MultipleViewCard
                        views={[
                            {
                                title: "Exámenes",
                                component: <Group parametro={parametro} />,
                            },
                            {
                                title: "Alumnos",
                                component: <Alumno />,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
