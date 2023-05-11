import React, { useEffect, useState } from "react";
import "./crearExamen.css";
import "../home/home.css";
import Sidebar from "../../components/sidebar/Sidebar.js";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

/**
 * @author: Cesar Ivan Hernandez Melendez
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
  const [searchParams] = useSearchParams();
  const [etiquetas, setEtiquetas] = useState([]);
  const [showingEtiquetas, setShowingEtiquetas] = useState([]);
  /**
   * Nos da todos las etiquetas
   */
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

  /**Funcion para actualizar la clase  */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "api/examen";

    const data = {
      Codigo: makeId(8),
      Nombre: titulo,
      Materia: materia,
      FechaInicio: fecha1 + "T" + hora1,
      FechaFin: fecha2 + "T" + hora2,
      idGrupo: searchParams.get("grupo"),
    };

    const result = await axios.post(url, data);
    console.log(result.data);
    tags.forEach((tag) => postTag(tag, result.data.idExamen));
  };

  const postTag = async (tag, idExamen) => {
    const filtrado = etiquetas.filter((etiqueta) => etiqueta.nombre === tag);
    console.log(tag);
    console.log(filtrado);

    let id = 0;

    if (filtrado.length === 0) {
      const url = "api/etiqueta";
      const data = {
        Nombre: tag,
      };
      const result = await axios.post(url, data);
      console.log(result.data);
      id = result.data.idEtiqueta;
    } else {
      id = filtrado[0].idEtiqueta;
    }
    console.log(id);
    const url = `api/etiqueta/${id}/examen/${idExamen}`;
    const result = await axios.post(url);
    console.log(result.data);
  };
  /**Checa que tecla fue usada */
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (currentTag.trim() !== "") {
        setTags([...tags, currentTag.trim()]);
        setCurrentTag("");
      }
    }
  };
  /**Checa que etiqeuta fue eliminar y le debes pasar como parametro la etiqueta a eliminar */
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
      <div class="home_background">
        <div className="CrearExamen">
          <h2>Crear un examen</h2>
          <form className="custom-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="titulo">Nombre del examen</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                value={titulo}
                required
                onChange={(event) => setTitulo(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="materia">Materia</label>
              <input
                type="text"
                className="form-control"
                id="materia"
                value={materia}
                required
                onChange={(event) => setMateria(event.target.value)}
              />
            </div>

            <div className="form-group row">
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

            <div className="form-group row">
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
                Hora de Inicio
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

            <div className="tags-container">
              {tags.map((tag) => (
                <div className="tag" key={tag}>
                  <span>{tag}</span>
                  <button onClick={() => handleTagDelete(tag)}>×</button>
                </div>
              ))}
            </div>
            <div className="form-group">
              <label htmlFor="tag-input">
                Etiquetas: (se mostrarán antes de iniciar el juego)
              </label>
              <input
                list="tags"
                id="tag-input"
                type="text"
                className="tagInput"
                value={currentTag}
                placeholder="Pulsa Enter para ingresar la etiqueta"
                onKeyDown={handleKeyDown}
                onChange={(event) => setCurrentTag(event.target.value)}
              />
              {showingEtiquetas && (
                <datalist id="tags" className="tagDatalist">
                  {showingEtiquetas &&
                    showingEtiquetas.map((etiqueta) => (
                      <option key={etiqueta.idEtiqueta} value={etiqueta.nombre}>
                        {etiqueta.nombre}
                      </option>
                    ))}
                </datalist>
              )}
            </div>

            <button type="submit" className="boton" align="right">
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
