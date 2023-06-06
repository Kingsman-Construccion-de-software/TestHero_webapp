import React, { useEffect, useState, useContext } from "react";
import styles from "./crearExamen.module.css";
import Sidebar from "../../components/sidebar/Sidebar.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfesorContext from "context/contextoProfesor";
import swal from "sweetalert";

/**
 * @author: Cesar Ivan Hernandez Melendez y Bernardo de la Sierra Rábago
 * @license: GP
 * @version: 2.1.0
 * Esta clase está dedicada a la página de Crear Examenes
 */

function CrearExamen() {
  // Estados para actualizar y crear la informacion
  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] = useState("");
  const [fecha1, setFecha1] = useState("");
  const [fecha2, setFecha2] = useState("");
  const [hora1, setHora1] = useState("");
  const [hora2, setHora2] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [etiquetas, setEtiquetas] = useState([]);
  const [showingEtiquetas, setShowingEtiquetas] = useState([]);
  const { state, setState } = useContext(ProfesorContext);

  /**
   * Nos da todos las etiquetas
   */

  const navigate = useNavigate();

  const getTags = async () => {
    const url = "api/etiqueta";
    const result = await axios.get(url);
    setEtiquetas([...result.data]);
  };
  /**
   * Filtra todas las etiquetas
   */
  const filterTags = (input) => {
    input = input.trim().toLowerCase();
    const etiquetasFiltered = etiquetas.filter((etiqueta) =>
      etiqueta.nombre.toLowerCase().includes(input)
    );
    setShowingEtiquetas(
      etiquetasFiltered.slice(0, Math.min(etiquetasFiltered.length, 10))
    );
  };
  /**
   * Crea un codigo
   */
  const makeId = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  /**
   * Navegar a examenes
   */
  const goToExamenes = () => {
    navigate(`/resumen/grupo?grupo=${state.idGrupo}`);
  };

  /**Funcion para actualizar la clase  */
  const handleSubmit = async (event) => {
    event.preventDefault();

    /** Maneja la funcion de actualizar el examen */
    const updateExamen = async (idExamen, data) => {
        const url = `api/examen/${idExamen}`;
        try {
            const result = await axios.put(url, data);
            if (result.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };

    const handleUpdate = async (idExamen, data) => {
        const result = await updateExamen(idExamen, data);
        if (result) {
            swal({
                title: "Examen actualizado",
                button: "Aceptar",
                icon: "success",
            });
            goToExamenes();
        } else {
            swal({
                title: "Error al actualizar el examen",
                button: "Aceptar",
                icon: "error",
            });
        }
    };

    //retornar si las fechas no son validas
    const date1 = fecha1 + "T" + hora1;
    const date2 = fecha2 + "T" + hora2;
    if (!validarFecha(date1, date2)) {
      return;
    }

    //se genera un codigo que no haya sido usado en otro examen
    const url = "api/examen";
    let codigoExamen = makeId(8);
    while (await buscar_examen(codigoExamen)) {
      codigoExamen = makeId(8);
    }

    const data = {
      Codigo: codigoExamen,
      Nombre: titulo,
      Materia: materia,
      FechaInicio: date1,
      FechaFin: date2,
      idGrupo: state.idGrupo,
    };

    // const result = await axios.post(url, data);

    //if (examToUpdate) {
    //    handleUpdate(examToUpdate.idExamen, data);
    //} else {
    //    const result = await axios.post(url, data);

    //    await tags.forEach((tag) => postTag(tag, result.data.idExamen));
    //    swal({
    //      title: "Se ha creado un examen",
    //      button: "Aceptar",
    //      icon: "success",
    //    });
    //    goToExamenes();
    //}

    const result = await axios.post(url, data);

    await tags.forEach((tag) => postTag(tag, result.data.idExamen));
    swal({
        title: "Se ha creado un examen",
        button: "Aceptar",
        icon: "success",
    });
    goToExamenes();
  };
  
  /**
   * Busca si un código de examen ya fue registrado
   */
  const buscar_examen = async (codigoExamen) => {
    const url2 = "api/examen/codigo/" + codigoExamen;
    try {
      const resultado = await axios.get(url2);
      if (resultado.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
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

  /**
   * Enviar request para agregar una etiqueta
   */
  const postTag = async (tag, idExamen) => {
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
    const url = `api/etiqueta/${id}/examen/${idExamen}`;
    const result = await axios.post(url);
  };
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

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    filterTags(currentTag);
  }, [currentTag]);

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="home_background">
        <div className={styles["CrearExamen"]}>
          <h2>Crear un examen</h2>
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
            <div className={styles["form-group"]}>
              <label htmlFor="tag-input">
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
                      <option key={etiqueta.idEtiqueta} value={etiqueta.nombre}>
                        {etiqueta.nombre}
                      </option>
                    ))}
                </datalist>
              )}
            </div>

            <button
              type="submit"
              className={styles["botonPreguntas"]}
              align="right"
            >
              Crear examen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearExamen;

//npm install react-datepicker --save
