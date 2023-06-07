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

  const getExamenes = async () => {
    const url = "api/examen/" + parametro;
    try {
      const result = await axios.get(url);
      console.log(result.data[0]);
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
      console.log(result.data);
      // setPoderes(result.data.map((p, i) => (i === p.idPoder ? 1 : p)));
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const empobj = {
      setTitulo,
      setMateria,
      setFecha1,
      setFecha2,
      setHora1,
      setHora2,
    };

    fetch("https://localhost:44423/crear/examen/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empobj),
    })
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
                              onChange={function validateCheck(e) {
                                if (e.target.checked) {
                                  setPoderes(
                                    poderes.map((p, i) => (i === id ? 1 : p))
                                  );
                                } else {
                                  setPoderes(
                                    poderes.map((p, i) => (i === id ? 0 : p))
                                  );
                                }
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
