import React, { Component } from "react";
import SidebarLogo from "../assets/SidebarLogo.png";
import Home from "../assets/Home.png";
import Questions from "../assets/Questions.png";
import Analytics from "../assets/Analytics.png";

import "./Sidebar.css";
/**
 * @author: Leonardo García
 * @license: GP
 * @version: 1.0.0
 * Esta clase está dedicada a la creación de una sidebar reutilizable en la mayoría de las páginas
 */

export default function Sidebar() {
  return (
    <div>
      <div class="sidenav">
        <div class="logoPrincipal">
          <img src={SidebarLogo} />
        </div>
        <div class="logo"></div>
        <br></br>
        <br></br>
        <a>
          <img src={Home} />
        </a>
        <br></br>
        <a>
          <img src={Questions} />
        </a>
        <br></br>
        <a>
          <img src={Analytics} />
        </a>
        <br></br>
      </div>
    </div>
  );
}
