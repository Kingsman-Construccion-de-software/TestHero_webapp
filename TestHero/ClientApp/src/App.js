import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/Layout";
import "./custom.css";
import Login from "./Pages/login/Login";
import HomePrincipal from "./Pages/home/HomePrincipal";
import CrearExamen from "./Pages/crearExamen/crearExamen";
export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      // <Layout>
      //   {/* <Routes>
      //     {AppRoutes.map((route, index) => {
      //       const { element, ...rest } = route;
      //       return <Route key={index} {...rest} element={element} />;
      //     })}
      //   </Routes> */}

      // </Layout>
      <div>
        <CrearExamen />
      </div>
    );
  }
}
