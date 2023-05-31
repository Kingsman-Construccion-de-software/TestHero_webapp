import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MultipleViewCard from "components/multiple-view-card/MultipleViewCard";
import Group from "Pages/group/Group";
import Alumno from "Pages/alumno/Alumno";
/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Clase que renderea los componentes
 */
export default function ExamenAlumno() {
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
            alert("Text copied to clipboard!");
        }
    };

    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div className="page">
                <div className="content">
                    {grupo && (
                        <div className="title-row">
                            <h1 className="tituloExamen">{grupo.nombre}</h1>
                            <div className="input-row">
                                <input
                                    type="text"
                                    ref={inputRef}
                                    defaultValue={`https://localhost:44423/examenAlumno?grupo=${grupo.idGrupo}`}
                                    placeholder={`https://localhost:44423/examenAlumno?grupo=${grupo.idGrupo}`}
                                    className="input-text"
                                />
                                <button onClick={handleCopyButtonClick} className="copy-button">
                                    Copiar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div className="muevelo">
                    <MultipleViewCard
                        views={[
                            {
                                title: "Examenes",
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
