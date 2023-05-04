import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./custom.css";
import ProfesorContext, { ProfesorContextProvider } from "context/contextoProfesor";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
          <ProfesorContextProvider>
            <Routes>
              {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} {...rest} element={element} />;
              })}
            </Routes> 
          </ProfesorContextProvider>
    );
  }
}
