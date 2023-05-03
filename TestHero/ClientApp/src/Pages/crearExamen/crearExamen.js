import React, { useState } from "react";
import "./crearExamen.css";
import "../home/home.css";
import Sidebar from "../../components/sidebar/Sidebar.js";

/**
 * @author: Cesar Ivan Hernandez Melendez
 * @license: GP
 * @version: 2.0.0
 * Esta clase está dedicada a la página de Crear Examenes
 */

function CrearExamen() {
  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] = useState("");
  const [grupo, setGrupo] = useState("");
  const [fecha1, setFecha1] = useState("");
  const [fecha2, setFecha2] = useState("");
  const [hora1, setHora1] = useState("");
  const [hora2, setHora2] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Título: ${titulo}`);
    console.log(`Materia: ${materia}`);
    console.log(`Grupo: ${grupo}`);
    console.log(`Fecha1: ${fecha1}`);
    console.log(`HoraDeInicio: ${hora1}`);
    console.log(`Fecha2: ${fecha2}`);
    console.log(`HoraDeCierre: ${hora2}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (currentTag.trim() !== "") {
        setTags([...tags, currentTag.trim()]);
        setCurrentTag("");
      }
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

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
              <label htmlFor="titulo">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                value={titulo}
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
              <label htmlFor="tag-input">Enter a tag:</label>
              <input
                id="tag-input"
                type="text"
                value={currentTag}
                onKeyDown={handleKeyDown}
                onChange={(event) => setCurrentTag(event.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" align="right">
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearExamen;

//npm install react-datepicker --save
