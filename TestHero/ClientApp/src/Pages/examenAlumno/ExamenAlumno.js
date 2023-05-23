import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
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
export default function ResumenExamen() {
  // Estados iniciales
  const [grupo, setGrupo] = useState();

function ResumenExamen() {
    const [grupo, setGrupo] = useState();
    const [searchParams] = useSearchParams();
    const parametro = searchParams.get("grupo");
    const [text, setText] = useState('');

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleCopyButtonClick = () => {
        navigator.clipboard.writeText(text);
        alert('Text copied to clipboard!');
    };

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

    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div className="page">
                <div className="content">
                    <div className="titleRow">
                        <h1 className="tituloExamen">{grupo && grupo.nombre}</h1>
                        <div className="textBox">
                            <input
                                type="text"
                                value={text}
                                onChange={handleInputChange}
                                placeholder="Enter text"
                            />
                            <button onClick={handleCopyButtonClick}>Copiar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
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
    );
}

