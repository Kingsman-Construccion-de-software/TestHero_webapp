import React from "react";
import SidebarLogo from "../../assets/SidebarLogo.png";
import Home from "../../assets/Home.png";
import Questions from "../../assets/Questions.png";
import Analytics from "../../assets/Analytics.png";

import "./Sidebar.css";
/**
 * @author: Leonardo García
 * @license: GP
 * @version: 1.0.0
 * Esta clase está dedicada a la creación de una sidebar reutilizable en la mayoría de las páginas
 */

export default function Sidebar() {
  return (
    <div className="sidenav">
      <img className="logoPrincipal" src={SidebarLogo} alt="logo" />
      <a>
        <img className="iconSidebar" src={Home} alt="Home" />
      </a>
      <a>
        <img className="iconSidebar" src={Questions} alt="Preguntas" />
      </a>
      <a>
        <img className="iconSidebar" src={Analytics} alt="Analiticas" />
      </a>
    </div>
  );
}
