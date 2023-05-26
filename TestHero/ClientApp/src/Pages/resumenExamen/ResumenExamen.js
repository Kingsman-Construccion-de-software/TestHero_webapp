import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./resumen.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useSearchParams } from "react-router-dom";
import MultipleViewCard from "components/multiple-view-card/MultipleViewCard";
import Questions from "Pages/questions/questions";
import Results from "Pages/results/Results";
/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Clase que renderea los componentes
 */
export default function ResumenExamen() {
  // Estados iniciales
  const [examen, setExamen] = useState();

    const [text, setText] = useState("");

    const inputRef = useRef(null);

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleCopyButtonClick = () => {
        const text = inputRef.current.value;
        if (text) {
            navigator.clipboard.writeText(text);
            alert("Text copied to clipboard!");
        }
    };

    const [searchParams] = useSearchParams();

    const getExamen = async () => {
        try {
            const url = "api/examen/" + searchParams.get("examen");
            const res = await axios.get(url);
            setExamen(res.data[0]);
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        getExamen();
    }, []);

    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div className="page">
                <div className="content">
                    {examen && (
                        <div className="title-row">
                            <h1 className="tituloExamen">{examen.nombre}</h1>
                            <div className="input-row">
                                <input
                                    type="text"
                                    ref={inputRef}
                                    value={text}
                                    onChange={handleInputChange}
                                    placeholder="Enter text"
                                    className="input-text"
                                />
                                <button onClick={handleCopyButtonClick} className="copy-button">
                                    Copy
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="subtitles">
            {examen && (
              <h2 className={styles["mover"]}>Código: {examen.codigo}</h2>
            )}
          </div>
        </div>
      </div>
      <div>
        <MultipleViewCard
          views={[
            { title: "Preguntas", component: <Questions /> },
            {
              title: "Resultados",
              component: <Results codigos={examen} />,
            },
          ]}
        />
      </div>
    </div>
  );
}
