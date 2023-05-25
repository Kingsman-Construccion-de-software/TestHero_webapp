import React from "react";
import SidebarLogo from "../../assets/SidebarLogo.png";
import Home from "../../assets/Home.png";
import Tasks from "../../assets/Tasks.png";
import BackArrow from "../../assets/BackArrow.png"
import Questions from "../../assets/Questions.png";
import Out from "../../assets/Out.png";
import { Link } from "react-router-dom";

import "./SidebarAlumno.css";

/**
 * @author: Bernardo de la Sierra
 * @license: GP
 * @version: 1.1.0
 * @description Esta clase está dedicada a la creación de una sidebar reutilizable en la mayoría de las páginas
 */

export default function Sidebar() {
  return (
    <div className="sidenav">
      <img className="logoPrincipal" src={SidebarLogo} alt="logo" />
      <Link to={"/homealumno"}>
        <img className="iconSidebar" src={BackArrow} alt="GoBack" />
      </Link>
      <Link to={"/homealumno"}>
        <img className="iconSidebar" src={Home} alt="Home" />
      </Link>
      <Link to={"/examenes"}>
        <img className="iconSidebar" src={Groups} alt="Groups" />
      </Link>
      <Link to={"/"}>
        <img className="iconSidebar" src={Out} alt="Log out" />
      </Link>
    </div>
  );
}

// Luego metemos las analiticas,
/*<Link to={"/grupos"}>
<img className="iconSidebar" src={Analytics} alt="Analiticas" />
</Link>*/
