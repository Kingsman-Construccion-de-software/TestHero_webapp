import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import styles from "./crearExamen.module.css";
import Sidebar from "../../components/sidebar/Sidebar.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfesorContext from "context/contextoProfesor";
import swal from "sweetalert";
import { useSearchParams } from "react-router-dom";
/**
 * @author: Cesar Ivan Hernandez Melendez
 * @license: GP
 * @version: 4.0
 * Esta clase está dedicada a la página de Editar Examenes
 */

function EditarExamen() {
  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] = useState("");
  const [fecha1, setFecha1] = useState("");
  const [fecha2, setFecha2] = useState("");
  const [hora1, setHora1] = useState("");
  const [hora2, setHora2] = useState("");
  const [tags, setTags] = useState([]);
  const [examenes, setExamenes] = useState();
  const [currentTag, setCurrentTag] = useState("");
  const [etiquetas, setEtiquetas] = useState();
  const [showingEtiquetas, setShowingEtiquetas] = useState([]);
  const { state, setState } = useContext(ProfesorContext);
  const { empid } = useParams();
  const navigate = useNavigate();

  const nombresPoderes = ["Volver a intentar", "Más tiempo", "Ayuda"];
  const [poderes, setPoderes] = useState(nombresPoderes.map((el) => 0));
  const [searchParams] = useSearchParams();
  const parametro = searchParams.get("examen");
  const goToExamenes = () => {
    navigate(`/resumen/grupo?grupo=${examenes.idGrupo}`);
  };

  const getExamenes = async () => {
    const url = "api/examen/" + parametro;
    try {
      const result = await axios.get(url);

      setTitulo(result.data[0].nombre);
      setMateria(result.data[0].materia);
      const modificaFecha = result.data[0].fechaInicio;
      var dateTimeParts = modificaFecha.split("T");
      var datePart = dateTimeParts[0]; // "2023-06-30"
      var timePart = dateTimeParts[1]; // "11:00:00"
      setFecha1(datePart);
      setHora1(timePart);
      const modificaFecha2 = result.data[0].fechaFin;
      var dateTimeParts = modificaFecha2.split("T");
      var datePart = dateTimeParts[0]; // "2023-06-30"
      var timePart = dateTimeParts[1]; // "11:00:00"
      setFecha2(datePart);
      setHora2(timePart);
      setExamenes(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getEtiqueta = async () => {
    const url = "api/etiqueta/examen/" + parametro;
    try {
      const result = await axios.get(url);
      setShowingEtiquetas(result.data);
      let nombres = result.data.map((resultado) => resultado.nombre);
      setTags(nombres);
    } catch (error) {
      console.log(error);
    }
  };

  const getPoder = async () => {
    const url = "api/examenpoder/" + parametro;
    try {
      const result = await axios.get(url);
      const poderesSeleccionados = nombresPoderes.map(() => 0);
      result.data.forEach((data) => {
        const poderIndex = data.idPoder - 1; //
        if (poderIndex >= 0 && poderIndex < nombresPoderes.length) {
          poderesSeleccionados[poderIndex] = 1;
        }
      });

      setPoderes(poderesSeleccionados);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExamenes();
    getEtiqueta();
    getPoder();
  }, []);

  /**Checa que tecla fue usada */
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (currentTag.trim() !== "") {
        if (tags.filter((tag) => tag === currentTag.trim()).length > 0) {
          swal({
            title: "Ya se agregó esta etiqueta, intenta otra por favor",
            button: "Aceptar",
            icon: "info",
          });
        } else {
          setTags([...tags, currentTag.trim()]);
          setCurrentTag("");
        }
      }
    }
  };
  /**Checa que etiqueta fue eliminar y le debes pasar como parametro la etiqueta a eliminar */
  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  // importante
  const handleSubmit = async (event) => {
    event.preventDefault();

    //retornar si las fechas no son validas
    const date1 = fecha1 + "T" + hora1;
    const date2 = fecha2 + "T" + hora2;
    if (!validarFecha(date1, date2)) {
      return;
    }

    //se genera un codigo que no haya sido usado en otro examen
    const url = "api/examen/" + parametro;
    const data = {
      Codigo: examenes.codigo,
      Nombre: titulo,
      Materia: materia,
      FechaInicio: date1,
      FechaFin: date2,
    };

    const result = await axios.put(url, data);

    // console.log(poderes);
    // await poderes.forEach((poder, id) =>
    //   updatePoder(poder, id, result.data.idExamen)
    // );
    swal({
      title: "Se ha editado un examen",
      button: "Aceptar",
      icon: "success",
    });
    goToExamenes();
  };

  const updatePoder = async (poder, idPoder, idExamen) => {
    const url = `api/examen/${idExamen}/poder/${idPoder + 1}`;
    if (poder === 1) {
      try {
        await axios.post(url); // Agregar poder
      } catch (e) {}
    } else {
      try {
        await axios.delete(url); // Elimina poder
      } catch (e) {}
    }
  };

  const postTag = async (tag, idExamen) => {
    console.log(tag);
    console.log(idExamen);
    const filtrado = etiquetas.filter((etiqueta) => etiqueta.nombre === tag);

    let id = 0;

    if (filtrado.length === 0) {
      const url = "api/etiqueta";

      const data = {
        Nombre: tag,
      };
      const result = await axios.post(url, data);
      id = result.data.idEtiqueta;
    } else {
      id = filtrado[0].idEtiqueta;
    }
    const url2 = `api/etiqueta/${id}/examen/${idExamen}`;
    try {
      const result = await axios.post(url2);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Validar fechas del examen
   */
  const validarFecha = (date1, date2) => {
    try {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      const now = new Date();
      let valid = d2.getTime() > now.getTime() && d2.getTime() > d1.getTime();
      if (!valid) {
        if (d2.getTime() <= now.getTime()) {
          swal({
            title: "La fecha de fin debe ser mayor a la fecha actual",
            button: "Aceptar",
            icon: "info",
          });
        } else if (d2.getTime() <= d1.getTime()) {
          swal({
            title: "La fecha de fin debe ser mayor a la fecha de inicio",
            button: "Aceptar",
            icon: "info",
          });
        } else {
          swal({
            title: "Ingresa las fecha y hora en el formato indicado",
            button: "Aceptar",
            icon: "info",
          });
        }
      }

      return valid;
    } catch (error) {
      return false;
    }
  };
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div class="home_background">
        <div className={styles["CrearExamen"]}>
          <h2>Editar un examen</h2>
          <form className="custom-form" onSubmit={handleSubmit}>
            <div className={styles["form-group"]}>
              <label htmlFor="titulo">Nombre del examen</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                placeholder="Nombre del examen"
                value={titulo}
                required
                onChange={(event) => setTitulo(event.target.value)}
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="materia">Materia</label>
              <input
                type="text"
                className="form-control"
                id="materia"
                placeholder="Nombre de la materia"
                value={materia}
                required
                onChange={(event) => setMateria(event.target.value)}
              />
            </div>

            <div className={`${styles["form-group"]} row`}>
              <label htmlFor="fecha1" className="col-sm-2 col-form-label">
                Fecha de Inicio
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="fecha1"
                  value={fecha1}
                  required
                  onChange={(event) => setFecha1(event.target.value)}
                />
              </div>
              <label htmlFor="hora1" className="col-sm-2 col-form-label">
                Hora de Inicio
              </label>
              <div className="col-sm-4">
                <input
                  type="time"
                  className="form-control"
                  id="hora1"
                  value={hora1}
                  required
                  onChange={(event) => setHora1(event.target.value)}
                />
              </div>
            </div>

            <div className={`${styles["form-group"]} row`}>
              <label htmlFor="fecha2" className="col-sm-2 col-form-label">
                Fecha de Cierre
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="fecha2"
                  value={fecha2}
                  required
                  onChange={(event) => setFecha2(event.target.value)}
                />
              </div>
              <label htmlFor="hora2" className="col-sm-2 col-form-label">
                Hora de Cierre
              </label>
              <div className="col-sm-4">
                <input
                  type="time"
                  className="form-control"
                  id="hora2"
                  value={hora2}
                  required
                  onChange={(event) => setHora2(event.target.value)}
                />
              </div>
            </div>

            <div className={styles["tags-container"]}>
              {tags.map((tag) => (
                <div className={styles["tag"]} key={tag}>
                  <span>{tag}</span>
                  <button onClick={() => handleTagDelete(tag)}>×</button>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-6">
                <div className={styles["form-group"]}>
                  <label className={styles["label2"]} htmlFor="tag-input">
                    Etiquetas: (se mostrarán antes de iniciar el juego)
                  </label>
                  <br />

                  <input
                    list="tags"
                    id={styles["tag-input"]}
                    type="text"
                    className="form-control"
                    value={currentTag}
                    placeholder="Pulsa Enter para ingresar la etiqueta"
                    onKeyDown={handleKeyDown}
                    onChange={(event) => setCurrentTag(event.target.value)}
                  />
                  {showingEtiquetas && (
                    <datalist id="tags" className={styles["tagDatalist"]}>
                      {showingEtiquetas &&
                        showingEtiquetas.map((etiqueta) => (
                          <option
                            key={etiqueta.idEtiqueta}
                            value={etiqueta.nombre}
                          >
                            {etiqueta.nombre}
                          </option>
                        ))}
                    </datalist>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className={styles["form-group"]}>
                  <label className={styles["label2"]} htmlFor="tag-input">
                    Poderes: (potenciadores para el alumno)
                  </label>
                  <div className={styles["checks"]}>
                    {nombresPoderes.map((poder, id) => {
                      return (
                        <>
                          <div className={styles["CheckFormat"]}>
                            <input
                              type="checkbox"
                              id={poder}
                              checked={poderes[id] === 1} // Verificar si el poder está seleccionado
                              onChange={(e) => {
                                const nuevosPoderes = [...poderes];
                                nuevosPoderes[id] = e.target.checked ? 1 : 0;
                                setPoderes(nuevosPoderes);
                              }}
                            />
                            <label className={styles["label"]} htmlFor={poder}>
                              {poder}
                            </label>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={styles["botonPreguntas"]}
              align="right"
            >
              Editar examen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarExamen;
