import React from "react";
import styles from "./loginalumno.module.css";
import logo from "../../assets/logo.png";
// import BackArrow from "../../assets/BackArrow.png";
import { useState } from "react";
import axios from "axios";
import { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProfesorContext from "context/contextoProfesor";
import { useSearchParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

/**
 * @author Bernardo de la Sierra y Leonardo García
 * @version 1.0.2
 * @license Gp
 * @params Sin parametros
 * @description Clase para que el usuario inicie sesion
 */

export default function Login() {
  // Parametros a actualizar
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const { state, setState } = useContext(ProfesorContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /**Cambia el correo */
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  /**Cambia ela contraseña */
  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  /** Hace el inicar sesion */
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      Correo: email,
      Password: password,
    };

    const url = "api/login/alumno";

    try {
      const result = await axios.post(url, data);
      setStatus(result.data.message);
      if (result.data.message === "Login exitoso") {
        getAlumno(result.data.id, result.data.idGrupo);
      }
    } catch (error) {
      console.log(error);
    }
  };
  /**Checa que dado un idAlumno nos guarde su informacion */
  const getAlumno = async (id, idGrupo) => {
    const url = `api/alumno/${id}`;

    try {
      const result = await axios.get(url);
      let res = result.data[0];
      let idGr = 0;

      let paramGrupo = searchParams.get("grupo");

      if (idGrupo === -1) {
        if (paramGrupo) {
          console.log("e");
          idGr = searchParams.get("grupo");
        } else {
          idGr = -1;
        }
      } else {
        idGr = idGrupo;
      }

      let alumno = {
        id: res.idAlumno,
        nombre: res.nombres + " " + res.apellidos,
        correo: res.correo,
        idGrupo: idGr,
      };

      setState(alumno);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "Login exitoso") {
      navigate("/homealumno");
    }
  }, [status]);

  // // función para hacer el boton de regreso
  // function GoBack() {
  //   navigate("/");
  // }

  return (
    <div className={styles["login"]}>
      <div className={styles["loginWrapper"]}>
        <FaArrowLeft
          className={styles["BackArrow"]}
          size={70}
          onClick={() => navigate(-1)}
        />
        <img src={logo} alt="Logo testHero" />
        <form className={styles["loginBox"]} onSubmit={handleLogin}>
          <p className={styles["texto"]}>Correo</p>
          <input
            placeholder="Correo"
            type="email"
            className={styles["loginInput"]}
            onChange={(e) => handleEmailChange(e.target.value)}
            value={email}
            required
          />
          <p className={styles["texto"]}>Contraseña</p>
          <input
            placeholder="Contraseña"
            type="password"
            className={styles["loginInput"]}
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={password}
            required
            minLength="8"
          />
          {status !== "Login exitoso." && (
            <p className={styles["textoError"]}>{status}</p>
          )}
          <Link to={`/registroAlumno`}>
            <p className={styles["textoRegistrate"]}>Regístrate</p>
          </Link>
          <button className={styles["loginButton"]}>Ingresar</button>
        </form>
      </div>
    </div>
  );
}
