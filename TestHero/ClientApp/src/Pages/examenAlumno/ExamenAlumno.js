import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
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

  const [searchParams] = useSearchParams();
  const parametro = searchParams.get("grupo");
  /**Checa que daod un idExmaen se pueda obtener todo su informacion */
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
          {grupo && <h1 className="tituloExamen">{grupo.nombre}</h1>}
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
