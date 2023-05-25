import React from "react";
import SidebarLogo from "../../assets/SidebarLogo.png";
import Home from "../../assets/Home.png";
import BackArrow from "../../assets/BackArrow.png";
import Groups from "../../assets/Groups.png";
import Out from "../../assets/Out.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Sidebar.css";

/**
 * @author: Leonardo García
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
      {location.pathname !== "/home" && (
        <img
          className="iconSidebar"
          src={BackArrow}
          alt="Volver"
          onClick={() => navigate(-1)}
        />
      )}

      <Link to={"/home"}>
        <img className="iconSidebar" src={Home} alt="Inicio" />
      </Link>
      <Link to={"/grupos"}>
        <img className="iconSidebar" src={Groups} alt="Grupos" />
      </Link>

      <Link to={"/"}>
        <img className="iconSidebar" src={Out} alt="Salir" />
      </Link>
    </div>
  );
}
// Luego metemos las analiticas,
/*<Link to={"/grupos"}>
<img className="iconSidebar" src={Analytics} alt="Analiticas" />
</Link>*/
