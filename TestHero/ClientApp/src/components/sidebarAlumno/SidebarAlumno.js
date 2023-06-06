import React from "react";
import SidebarLogo from "../../assets/SidebarLogo.png";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import { GiNotebook } from "react-icons/gi";
import styles from "./SidebarAlumno.module.css";

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
    <div className={styles["sidenav"]}>
      <img className={styles["logoPrincipal"]} src={SidebarLogo} alt="logo" />
      <a className={styles["iconSidebar"]}>
        {location.pathname !== "/homealumno" && (
          <FaArrowLeft
            className={styles["icon"]}
            size={70}
            onClick={() => navigate(-1)}
          />
        )}
      </a>
      <Link to={"/homealumno"}>
        <FaHome className={styles["icon"]} size={70} />
      </Link>

      <Link to={"/examenes"}>
        <GiNotebook className={styles["icon"]} size={70} />
      </Link>
      <Link to={"/"}>
        <BiExit className={styles["icon"]} size={70} />
      </Link>
    </div>
  );
}
