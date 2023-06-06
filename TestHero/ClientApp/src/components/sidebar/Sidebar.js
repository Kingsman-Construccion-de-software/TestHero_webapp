import React from "react";
import SidebarLogo from "../../assets/SidebarLogo.png";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { BiGroup, BiExit } from "react-icons/bi";

import styles from "./Sidebar.module.css";

/**
 * @author: Leonardo García y Bernardo de la Sierra (Modifico)
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
        {location.pathname !== "/home" && (
          <FaArrowLeft
            className={styles["icon"]}
            size={70}
            onClick={() => navigate(-1)}
          />
        )}
      </a>
      <Link to={"/home"} className={styles["iconSidebar"]}>
        <FaHome className={styles["icon"]} size={70} />
      </Link>
      <Link to={"/grupos"}>
        <BiGroup className={styles["icon"]} size={70} />
      </Link>
      <Link to={"/"}>
        <BiExit className={styles["icon"]} size={70} />
      </Link>
    </div>
  );
}
// Luego metemos las analiticas,
/*<Link to={"/grupos"}>
<img className="iconSidebar" src={Analytics} alt="Analiticas" />
</Link>*/
