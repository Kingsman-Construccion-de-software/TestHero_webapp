import { useState } from "react";
import styles from "./formularioPregunta.module.css";
import axios from "axios";
import swal from "sweetalert";
import { BsFillCaretDownFill } from "react-icons/bs";

/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 2.1.1
 * @license Gp
 * @params Recibe handleSelected, getPreguntas y idExamen
 * @description Esta clase crea el formulario de preguntas
 */
export default function FormularioPregunta({
  handleSelected,
  getPreguntas,
  idExamen,
  etiquetas,
}) {
  // Estados para actualzar
  const [fpregunta, setFpregunta] = useState("");
  const [opcion, setOpcion] = useState("");
  const [opcion2, setOpcion2] = useState("");
  const [opcion3, setOpcion3] = useState("");
  const [opcion4, setOpcion4] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [activo, setActivo] = useState(false);
  const [guarda, setGuarda] = useState(null);
  const [selects, setSelects] = useState([]);
  /**
   * Activa y desactiva el modal de eliminar
   */
  const handleOptionChange = (event) => {
    setSelectedValue(event.target.value);
  };

  /***
   * Formulario para crear preguntas
   * No recibe ningun parametro
   */
  const creaPregunta = async (e) => {
    e.preventDefault();
    // Rutas prestablecidas
    const URIpregunta = "api/pregunta";
    const URIrespuesta = "api/respuesta";
    try {
      if (!selectedValue || selects === "") {
        swal({
          title:
            "Antes de crear la pregunta debe seleccionar la respuesta correcta",
          button: "Aceptar",
          icon: "warning",
        });
        return;
      } else if (selectedValue) {
        const result = await axios.post(URIpregunta, {
          idExamen: idExamen,
          textoPregunta: fpregunta,
          idEtiqueta: guarda,
        });

        const data1 = {
          TextoRespuesta: opcion,
          EsCorrecta: 0,
          idPregunta: result.data.idPregunta,
        };
        const data2 = {
          TextoRespuesta: opcion2,
          EsCorrecta: 0,
          idPregunta: result.data.idPregunta,
        };

        const data3 = {
          TextoRespuesta: opcion3,
          EsCorrecta: 0,
          idPregunta: result.data.idPregunta,
        };
        const data4 = {
          TextoRespuesta: opcion4,
          EsCorrecta: 0,
          idPregunta: result.data.idPregunta,
        };

        if (selectedValue === "option0") {
          data1.EsCorrecta = 1;
        } else if (selectedValue === "option1") {
          data2.EsCorrecta = 1;
        } else if (selectedValue === "option2") {
          data3.EsCorrecta = 1;
        } else if (selectedValue === "option3") {
          data4.EsCorrecta = 1;
        }

        await axios.post(URIrespuesta, data1);
        await axios.post(URIrespuesta, data2);
        await axios.post(URIrespuesta, data3);
        await axios.post(URIrespuesta, data4);
      }
    } catch (error) {
      console.log(error);
    }

    swal({
      title: "Se ha creado una pregunta",
      button: "Aceptar",
      icon: "success",
    });

    getPreguntas();
    handleSelected();
  };

  return (
    <div className={styles["pregunta"]}>
      <form onSubmit={creaPregunta}>
        <div className={styles["dropdown"]}>
          <input
            className={styles["inputpregunta"]}
            placeholder="Escribe la pregunta"
            value={fpregunta}
            required
            maxLength={50}
            onChange={(e) => setFpregunta(e.target.value)}
            type="text"
          />
        </div>

        <div className={styles["extension"]}>
          <div className={styles["respuestas"]}>
            <div className={styles["respuesta"]}>
              <input
                type="radio"
                value="option0"
                required
                maxLength={50}
                checked={selectedValue === "option0"}
                onChange={handleOptionChange}
              />
              <input
                className={styles["opciones"]}
                placeholder="Opcion 1"
                value={opcion}
                maxLength={50}
                required
                onChange={(e) => setOpcion(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles["respuesta"]} value="opción2">
              <input
                type="radio"
                value="option1"
                required
                maxLength={50}
                checked={selectedValue === "option1"}
                onChange={handleOptionChange}
              />
              <input
                className={styles["opciones"]}
                placeholder="Opcion 2"
                value={opcion2}
                required
                maxLength={50}
                onChange={(e) => setOpcion2(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles["respuesta"]} value="opción3">
              <input
                type="radio"
                value="option2"
                required
                maxLength={50}
                checked={selectedValue === "option2"}
                onChange={handleOptionChange}
              />
              <input
                className={styles["opciones"]}
                placeholder="Opcion 3"
                value={opcion3}
                required
                maxLength={50}
                onChange={(e) => setOpcion3(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles["respuesta"]} value="opción4">
              <input
                type="radio"
                value="option3"
                required
                maxLength={50}
                checked={selectedValue === "option3"}
                onChange={handleOptionChange}
              />
              <input
                className={styles["opciones"]}
                placeholder="Opcion 4"
                value={opcion4}
                required
                maxLength={50}
                onChange={(e) => setOpcion4(e.target.value)}
                type="text"
              />
            </div>
            {etiquetas.length !== 0 && (
              <div className={styles["dropdown2"]}>
                {selects === null ? (
                  <div
                    className={styles["dropdown2-btn"]}
                    onClick={(e) => setActivo(!activo)}
                  >
                    Elige una etiqueta
                    <BsFillCaretDownFill />
                  </div>
                ) : selects === "" ? (
                  <div
                    className={styles["dropdown2-btn"]}
                    onClick={(e) => setActivo(!activo)}
                  >
                    Elige una etiqueta
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
                    {etiquetas.map((op) => (
                      <div
                        className={styles["dropdown2-item"]}
                        key={op.idEtiqueta}
                        onClick={(e) => {
                          setSelects(op.nombre);
                          setActivo(false);
                          setGuarda(op.idEtiqueta);
                        }}
                      >
                        {op.nombre}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {!selectedValue && (
          <p className={styles["aviso"]}>
            Asegúrate de llenar todos los campos y marcar una respuesta como
            correcta
          </p>
        )}
        <button
          className={styles["botonCancelarPregunta"]}
          onClick={handleSelected}
        >
          Cancelar
        </button>
        <input
          type="submit"
          value="Crear pregunta"
          className={styles["botonPreguntas"]}
        />
      </form>
    </div>
  );
}
