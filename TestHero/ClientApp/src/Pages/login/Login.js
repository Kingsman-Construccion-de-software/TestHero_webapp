import React from "react";
import styles from "./login.module.css";
import logo from "../../assets/logo.png";
import BackArrow from "../../assets/BackArrow.png";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProfesorContext from "context/contextoProfesor";

/**
 * @author Bernardo de la Sierra y Leonardo García
 * @version 2.1.1
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

    const url = "api/login";

    try {
      const result = await axios.post(url, data);
      setStatus(result.data.message);
      if (result.data.message === "Login exitoso") {
        getProfesor(result.data.id);
      }
    } catch (error) {
      alert(error);
    }
  };
  /**Checa que dado un idProfesor nos guarde su informacion */
  const getProfesor = async (id) => {
    const url = `api/profesor/${id}`;

    try {
      const result = await axios.get(url);
      let res = result.data[0];
      let profesor = {
        id: res.idProfesor,
        nombre: res.nombre + " " + res.apellido,
        correo: res.correo,
      };
      setState(profesor);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (status === "Login exitoso") {
      navigate("/home");
    }
  }, [status]);

  // función para hacer el boton de regreso
  function GoBack() {
    navigate("/");
  }

  return (
    <div className={styles["login"]}>
      <div className={styles["loginWrapper"]}>
        <img
          className={styles["BackArrow"]}
          src={BackArrow}
          onClick={GoBack}
          alt="GoBack"
        ></img>
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
          <Link to={`/registroProfesor`}>
            <p className={styles["textoRegistrate"]}>Regístrate</p>
          </Link>
          <button className={styles["loginButton"]}>Ingresar</button>
        </form>
      </div>
    </div>
  );
}
