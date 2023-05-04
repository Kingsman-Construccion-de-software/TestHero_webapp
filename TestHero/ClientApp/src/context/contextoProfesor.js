import React, { createContext, useState } from "react";

const DEFAULT_VALUE = {
  state: {
    id: 0,
    nombre: "",
    correo: ""
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