import { useState } from "react";

// Estilos
import styles from "./selectable-navbar.module.css";
import useGetSelectedTitle from "./hooks/useGetSelectedTitle";
/**
 * @author Juan Camilo
 * @version 1.1.1
 * @license Gp
 * @params Recibe nombre,fechaFin y enlace
 * @description Renderea los componentes
 */
export default function SelectableNavbar({ titles, getSelectedTitle }) {
  const [selectedTitle, setSelectedTitle] = useState(titles[0]);
  useGetSelectedTitle(selectedTitle, getSelectedTitle);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {titles.map((title) => (
          <li
            className={
              styles["item-container"] +
              (selectedTitle === title ? ` ${styles["active-item"]}` : "")
            }
          >
            <button onClick={() => setSelectedTitle(title)}>{title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
