import SidebarAlumno from "components/sidebarAlumno/SidebarAlumno";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./resumenAlumno.module.css";
import { useSearchParams } from "react-router-dom";
import ProfesorContext from "context/contextoProfesor";
/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Clase que renderea los componentes
 */
export default function ResumenAlumno() {
  // Estados iniciales
  const [examen, setExamen] = useState();
  const { state, setState } = useContext(ProfesorContext);
  const [searchParams] = useSearchParams();

  /**Checa que daod un idExamen se pueda obtener todo su informacion */
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
        <SidebarAlumno />
      </div>
      <div className="page">
        <div className="content">
          {examen && <h1 className="tituloExamen">{examen.nombre}</h1>}
          <div className="subtitles">
            {examen && (
              <h2 className={styles["mover"]}>Código: {examen.codigo}</h2>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* <div className={styles["muevelo"]}>
          <MultipleViewCard
            views={[
              { title: "Preguntas", component: <Questions /> },
              {
                title: "Resultados",
                component: <Results codigos={examen} />,
              },
            ]}
          />
        </div> */}
      </div>
    </div>
  );
}
