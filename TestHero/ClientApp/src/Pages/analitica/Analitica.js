import React, { useState, useEffect } from "react";
import styles from "./analitica.module.css";
import axios from "axios";
import { BsFillCaretDownFill } from "react-icons/bs";
/**
 * @author: JUlio Meza y Bernardo de la Sierra
 * @license: GP
 * @version: 1.1.1
 * Esta clase está dedicada al analisis de datos
 */

export default function Analitica({ examen }) {
  const [promedio, setPromedio] = useState(0);
  const [desviacion, setDesviacion] = useState(0);
  const [tasa, setTasa] = useState(0);
  const [dificil, setDificil] = useState("");
  const [selects, setSelects] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [activo, setActivo] = useState(false);

  const getPromedio = async () => {
    try {
      const url = "api/examen/" + examen.idExamen + "/promedio";
      const res = await axios.get(url);
      setPromedio(res.data.valor);
    } catch (e) {
      console.log(e);
    }
  };

  const getDesviacion = async () => {
    try {
      const url = "api/examen/" + examen.idExamen + "/desvest";
      const res = await axios.get(url);

      setDesviacion(res.data.valor);
    } catch (e) {
      console.log(e);
    }
  };

  const getTasa = async () => {
    try {
      const url = "api/examen/" + examen.idExamen + "/tasaaprob";
      const res = await axios.get(url);

      setTasa(res.data.valor);
    } catch (e) {
      console.log(e);
    }
  };

  const getDificil = async () => {
    try {
      const url = "api/examen/" + examen.idExamen + "/masdificil";
      const res = await axios.get(url);

      setDificil(res.data.label);
    } catch (e) {
      console.log(e);
    }
  };
  //"api/pregunta/examen/{id:int}"
  const getPreguntas = async () => {
    try {
      const url = "api/pregunta/examen/" + examen.idExamen;
      const res = await axios.get(url);
      console.log(res.data);
      setPreguntas(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPromedio();
    getDesviacion();
    getTasa();
    getDificil();
    getPreguntas();
  }, []);

  return (
    <div className={styles["home_background"]}>
      <div className={styles["cuadroPagina"]}>
        <h1 className={styles["tituloPagina"]}>
          Esta es la pregunta más difícil es
        </h1>
        <p className={styles["datosPagina"]}> {dificil} </p>
      </div>
      <div className={styles["espaciado"]}>
        <div className={styles["cuadroPaginaChico"]}>
          <h1 className={styles["tituloPagina"]}>Promedio</h1>
          <p className={styles["datosPagina"]}>El promedio es de {promedio} </p>
        </div>
        <div className={styles["cuadroPaginaChico"]}>
          <h1 className={styles["tituloPagina"]}>Desviación estándar</h1>
          <p className={styles["datosPagina"]}>
            La desviación estándar es de {desviacion}{" "}
          </p>
        </div>
        <div className={styles["cuadroPaginaChico"]}>
          <h1 className={styles["tituloPagina"]}>Tasa de aprobación</h1>
          <p className={styles["datosPagina"]}>
            La tasa de aprobación es de {tasa}{" "}
          </p>
        </div>
      </div>
      <div className={styles["espaciado"]}>
        <div className={styles["cuadroPaginaGrafico"]}>
          <h1 className={styles["tituloPagina"]}>Gráfico de cajas y bigotes</h1>
        </div>
        <div className={styles["cuadroPaginaGrafico"]}>
          <h1 className={styles["tituloPagina"]}>Gráfico de pastel</h1>

          <div className={styles["dropdown2"]}>
            {selects === null ? (
              <div
                className={styles["dropdown2-btn"]}
                onClick={(e) => setActivo(!activo)}
              >
                Elige una pregunta
                <BsFillCaretDownFill />
              </div>
            ) : selects === "" ? (
              <div
                className={styles["dropdown2-btn"]}
                onClick={(e) => setActivo(!activo)}
              >
                Elige una pregunta
                <BsFillCaretDownFill />
              </div>
            ) : (
              <div
                className={styles["dropdown2-btn"]}
                onClick={(e) => setActivo(!activo)}
              >
                {selects}
                <BsFillCaretDownFill />
              </div>
            )}

            {activo && (
              <div className={styles["dropdown2-content"]}>
                {preguntas.map((op, index) => (
                  <div
                    className={styles["dropdown2-item"]}
                    key={op.idEtiqueta}
                    onClick={(e) => {
                      setSelects(op.textoPregunta);
                      setActivo(false);
                    }}
                  >
                    {op.textoPregunta}
                  </div>
                ))}
              </div>
            )}
          </div>
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
