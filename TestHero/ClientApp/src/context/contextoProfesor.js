import React, { createContext, useState } from "react";

const DEFAULT_VALUE = {
  state: {
    id: -1,
    nombre: "",
    correo: "",
    idGrupo: -1,
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
