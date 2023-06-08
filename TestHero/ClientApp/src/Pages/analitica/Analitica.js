import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import styles from "./analitica.module.css";
import "./analitica.css";
import axios from "axios";
import { BsFillCaretDownFill } from "react-icons/bs";
import { VictoryBoxPlot, VictoryPie, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryLegend, VictoryGroup, VictoryArea, VictoryPolarAxis } from "victory";
import {VictoryHistogram} from "victory-histogram";
import { ObjectFlags } from "typescript";
/**
 * @author: Julio Meza y Bernardo de la Sierra
 * @license: GP
 * @version: 1.1.1
 * Esta clase está dedicada al analisis de datos
 */

export default function Analitica({ examen }) {

  const [promedio, setPromedio] = useState(0);
  const [desviacion, setDesviacion] = useState(0);
  const [tasa, setTasa] = useState(0);
  const [dificil, setDificil] = useState("");
  const [calificaciones, setCalificaciones] = useState([]);
  const [clasesRespuestas, setClasesRespuestas] = useState([]);
  const [performances, setPerformances] = useState([]);
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

  const getCalificaciones = async () => {
    try {
      const url = "api/examen/" + examen.idExamen + "/calificaciones";
      const res = await axios.get(url);
      setCalificaciones(res.data.map(res => res.valor));
    } catch(e){
      console.log(e);
    }
  }


  const getPreguntas = async () => {
    try {
      const url = "api/pregunta/examen/" + examen.idExamen;
      const res = await axios.get(url);
      setPreguntas(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getClasesRespuestas = async (idPregunta) => {
    try {
      const url = "api/pregunta/" + idPregunta + "/clases/respuestas";
      const res = await axios.get(url);
      setClasesRespuestas(res.data);
    } catch(e){
      console.log(e);
    }
  }

  const getPorcentajesTemas = async () => {
    try {
      const url = "api/examen/" + examen.idExamen + "/porcentajes/temas";
      const res = await axios.get(url);
      const procesado = res.data.map((el) => {
        return ({x: el.label, y:el.valor})
      })
      console.log(procesado);
      setPerformances(procesado);
    } catch(e){
      console.log(e);
    }
  }

  const GraficaCajaBigotes = () => {
    return (
      <VictoryChart 
        horizontal domainPadding={20}
      >

        <VictoryAxis
          tickValues={[""]}
          label=""
          style={{
            axis: {stroke: "#EBEBEB"},
          }}
        />

        <VictoryAxis
          dependentAxis
          label="Calificación"
          style={{
            axis: {stroke: "#EBEBEB"},
            axisLabel: {fontSize: 20, fill: "#EBEBEB", padding: 30},
            tickLabels: {fontSize: 15, fill: "#EBEBEB", padding: 5}
          }}
          theme={VictoryTheme.material}
          tickFormat={x => x}
        />

        <VictoryBoxPlot 
          minLabels
          maxLabels
          medianLabels
          labelOrientation="top"
          boxWidth={50}
          data={[ 
            {x:1, y: calificaciones} 
          ]}
          style={{
            min: { stroke: "tomato" },
            max: { stroke: "orange" },
            q1: { fill: "tomato" },
            q3: { fill: "orange" },
            median: { stroke: "#EBEBEB", strokeWidth: 3 },
            minLabels: { fill: "#EBEBEB" },
            medianLabels: { fill: "#EBEBEB"},
            maxLabels: { fill: "#EBEBEB" }
          }}
          theme={VictoryTheme.material}
        />
      </VictoryChart>
    );
  }

  const GraficaHistograma = () => {
    return (
      <VictoryChart 
        domainPadding={20}

      >

        <VictoryAxis
          label="Calificación"
          style={{
            axis: {stroke: "#EBEBEB"},
            axisLabel: {fontSize: 20, fill: "#EBEBEB", padding: 30},
            tickLabels: {fontSize: 15, fill: "#EBEBEB", padding: 5}
          }}
          theme={VictoryTheme.material}
        />

        <VictoryAxis
          dependentAxis
          label="Frecuencia"
          style={{
            axis: {stroke: "#EBEBEB"},
            axisLabel: {fontSize: 20, fill: "#EBEBEB", padding:30},
            tickLabels: {fontSize: 15, fill: "#EBEBEB", padding: 5}
          }}
          theme={VictoryTheme.material}
        />

        <VictoryHistogram
          data={calificaciones.map((cal) => {
              return {x: cal}
            })
          }
          bins={Math.ceil(calificaciones.length / 5)}
          style={{
            data: {fill: "tomato", stroke: ""}
          }}
          theme={VictoryTheme.material}
        />
      </VictoryChart>
    );
  }

  const GraficaPastel = () => {
    let colors = ["tomato", "orange", "gold", "yellow"]

    return (
      <div className={styles["pieContainer"]}>
        <VictoryPie
          data={
            construyeDiccionario(clasesRespuestas)
          }
          width={600}
          style = {{
            labels: {
              fontSize: 0, fill: "#EBEBEB"
            }
          }}
          categories={{ x: clasesRespuestas.map(res => 1) }}
          labels={clasesRespuestas.map(res => 1)}
          colorScale={colors}
          theme={VictoryTheme.material}
        />
        <VictoryLegend
            title="Respuestas"
            centerTitle
            orientation="vertical"
            gutter={10}
            height={200}
            style={{ 
              border: { stroke: "#EBEBEB" }, 
              title: {fontSize: 20, fill: "#EBEBEB" },
              labels: { fill: "#EBEBEB"}
            }}
            data={clasesRespuestas.map((res, i) => 
              { return {name: res.label, symbol: {fill: colors[i]}}}
            )}
        />
      </div>
    );
  }

  //crea un diccionario a partir de las clases de respuestas, para
  //obtener los datos en el formato requerido por el pie chart
  const construyeDiccionario = (data) => {
    const dict = {}
    data.forEach( (dat) => {
      if(dict[dat.label]){
        dict[dat.label] += 1;
      } else {
        dict[dat.label] = 1;
      }
    });

    const res = Object.entries(dict).map(([key, value], idx) => {
      return {x: idx, y: value, label: key}
    })
    return res;

  }




  const GraficaRadar = () => {

    return (
      <VictoryChart polar
        theme={VictoryTheme.material}
        domain={{ y: [ 0, 1 ] }}
      >

        <VictoryGroup colorScale={["tomato"]}
          style={{ data: { fillOpacity: 0.3, strokeWidth: 2 } }}
        >
            <VictoryArea data={performances}/>
        </VictoryGroup>
        {
          performances.map((perf, i) => {
            return (
              <VictoryPolarAxis key={i} dependentAxis
                style={{
                  axisLabel: { padding: 10, fill: "#EBEBEB" },
                  axis: { stroke: "none" },
                  tickLabels: {fill: "#EBEBEB"},
                  grid: { stroke: "#EBEBEB", strokeWidth: 0.5, opacity: 0.75 }
                }}
                tickLabelComponent={
                  <VictoryLabel labelPlacement="vertical"/>
                }
                labelPlacement="perpendicular"
                axisValue={i + 1} label={perf.x}
                tickValues={[0.25, 0.5, 0.75]}
              />
            );
          })
        }
        
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickFormat={() => ""}
          style={{
            axis: { stroke: "none" },
            grid: { stroke: "#EBEBEB", opacity: 0.75 }
          }}
        />

    </VictoryChart>  
    )
  }


  useEffect(() => {
    getPromedio();
    getDesviacion();
    getTasa();
    getDificil();
    getPreguntas();
    getCalificaciones();
    getPorcentajesTemas();
  }, []);

  return (
    <div className={styles["home_background"]}>
      <div className={styles["cuadroPagina"]}>
        <h1 className={styles["tituloPagina"]}>
          La pregunta más difícil es:
        </h1>
        <p className={styles["datosPagina"]}> {dificil} </p>
      </div>
      <div className={styles["espaciado"]}>
        <div className={styles["cuadroPaginaChico"]}>
          <h1 className={styles["tituloPagina"]}>Promedio</h1>
          <p className={styles["datosPagina"]}>{promedio} </p>
        </div>
        <div className={styles["cuadroPaginaChico"]}>
          <h1 className={styles["tituloPagina"]}>Desviación estándar</h1>
          <p className={styles["datosPagina"]}>
            {desviacion}
          </p>
        </div>
        <div className={styles["cuadroPaginaChico"]}>
          <h1 className={styles["tituloPagina"]}>Tasa de aprobación</h1>
          <p className={styles["datosPagina"]}>
            {tasa}
          </p>
        </div>
      </div>
      <div className={styles["espaciado"]}>
        <div className={styles["cuadroPaginaGrafico"]}>
          <h1 className={styles["tituloGrafica"]}>Resumen de las calificaciones</h1>
          {calificaciones && calificaciones.length > 0 && 
            GraficaCajaBigotes()
          }
        </div>
        <div className={styles["cuadroPaginaGrafico"]}>
          <h1 className={styles["tituloPagina"]}>Cantidad de respuestas por opción</h1>

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
                    key={op.idPregunta}
                    onClick={(e) => {
                      setSelects(op.textoPregunta);
                      setActivo(false);
                      getClasesRespuestas(op.idPregunta)
                    }}
                  >
                    {op.textoPregunta}
                  </div>
                ))}
              </div>
            )}
          </div>


          {clasesRespuestas && clasesRespuestas.length > 0 && 
            GraficaPastel()
          }

        </div>
      </div>
      <div className={styles["espaciado"]}>
        <div className={styles["cuadroPaginaGrafico"]}>
          <h1 className={styles["tituloGrafica"]}>Distribución de las calificaciones</h1>
          {calificaciones && calificaciones.length > 0 && 
            GraficaHistograma()
          }
        </div>
        <div className={styles["cuadroPaginaGrafico"]}>
          <h1 className={styles["tituloGrafica"]}>Desempeño de los alumnos por tema</h1>
          {performances && performances.length > 0 && 
            GraficaRadar()
          }
        </div>
      </div>
    </div>
  );
}
