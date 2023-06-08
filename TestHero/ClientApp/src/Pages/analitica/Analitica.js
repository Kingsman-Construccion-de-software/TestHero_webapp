import React, { useState } from "react";
import styles from "./analitica.module.css";

/**
 * @author: JUlio Meza y Bernardo de la Sierra
 * @license: GP
 * @version: 1.1.1
 * Esta clase está dedicada al analisis de datos
 */

export default function Analitica() {
  return (
    <div className={styles["home_background"]}>
      <div className={styles["cuadroPagina"]}>
        <h1 className={styles["tituloPagina"]}>
          Esta es la pregunta más difícil
        </h1>
      </div>
      <div className={styles["espaciado"]}>
        <div className={styles["cuadroPaginaChico"]}>
          <h1 className={styles["tituloPagina"]}>Promedio</h1>
        </div>
        <div className={styles["cuadroPaginaChico"]}>
          <h1 className={styles["tituloPagina"]}>Desviación estándar</h1>
        </div>
        <div className={styles["cuadroPaginaChico"]}>
          <h1 className={styles["tituloPagina"]}>Tasa de aprobación</h1>
        </div>
      </div>
      <div className={styles["espaciado"]}>
        <div className={styles["cuadroPaginaGrafico"]}>
          <h1 className={styles["tituloPagina"]}>Gráfico de cajas y bigotes</h1>
        </div>
        <div className={styles["cuadroPaginaGrafico"]}>
          <h1 className={styles["tituloPagina"]}>Gráfico de pastel</h1>
        </div>
      </div>
      <div className={styles["espaciado"]}>
        <div className={styles["cuadroPaginaGrafico"]}>
          <h1 className={styles["tituloPagina"]}>Gráfico de histograma</h1>
        </div>
        <div className={styles["cuadroPaginaGrafico"]}>
          <h1 className={styles["tituloPagina"]}>Gráfico de radar</h1>
        </div>
      </div>
    </div>
  );
}
