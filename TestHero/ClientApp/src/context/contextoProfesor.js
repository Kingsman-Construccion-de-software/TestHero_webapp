import React, { createContext, useState } from "react";
/**
 * @author Bernardo de la Sierra(Modifico ) y Julio Meza
 * @version 2.1.1
 * @license Gp
 * @params Sin parametros
 * @description Da contexto a todo el codigo para identificar si es alumno o maestro
 */
const DEFAULT_VALUE = {
  state: {
    id: -1,
    nombre: "",
    correo: "",
    idGrupo: -1,
    idExamen: -1,
  },
  setState: () => {},
};

const ProfesorContext = createContext(DEFAULT_VALUE);

function ProfesorContextProvider({ children }) {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  return (
    <ProfesorContext.Provider value={{ state, setState }}>
      {children}
    </ProfesorContext.Provider>
  );
}

export { ProfesorContextProvider };
export default ProfesorContext;
