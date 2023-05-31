import React from "react";
import SidebarLogo from "../../assets/SidebarLogo.png";
import Home from "../../assets/Home.png";
import Tasks from "../../assets/Tasks.png";
import BackArrow from "../../assets/BackArrow.png";
import Questions from "../../assets/Questions.png";
import Out from "../../assets/Out.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./SidebarAlumno.css";

/**
 * @author: Bernardo de la Sierra
 * @license: GP
 * @version: 1.1.0
 * @description Esta clase está dedicada a la creación de una sidebar reutilizable en la mayoría de las páginas
 */

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidenav">
      <img className="logoPrincipal" src={SidebarLogo} alt="logo" />
      {location.pathname !== "/homealumno" && (
        <img
          className="iconSidebar"
          src={BackArrow}
          alt="Volver"
          onClick={() => navigate(-1)}
        />
      )}
      <Link to={"/homealumno"}>

        <img className="iconSidebar" src={Home} alt="Inicio" />

      </Link>

      <Link to={"/examenes"}>
        <img className="iconSidebar" src={Tasks} alt="Tareas" />
      </Link>
      <Link to={"/"}>
        <img className="iconSidebar" src={Out} alt="Salir" />
      </Link>
    </div>
  );
}
