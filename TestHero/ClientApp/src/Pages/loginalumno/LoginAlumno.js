import React from "react";
import "./loginalumno.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfesorContext from "context/contextoProfesor";

/**
 * @author Bernardo de la Sierra
 * @version 1.0.0
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

    const url = "api/login/alumno";

    try {
      const result = await axios.post(url, data);
      setStatus(result.data.message);
      if (result.data.message === "Login exitoso") {
        getAlumno(result.data.id);
      }
    } catch (error) {
      alert(error);
    }
  };
  /**Checa que dado un idAlumno nos guarde su informacion */
  const getAlumno = async (id) => {
    const url = `api/alumno/${id}`;

    try {
      const result = await axios.get(url);
      let res = result.data[0];
      let alumno = {
        id: res.idAlumno,
        nombre: res.nombres + " " + res.apellidos,
        correo: res.correo,
      };
      setState(alumno);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (status === "Login exitoso") {
      navigate("/home");
    }
  }, [status]);

  return (
    <div className="login">
      <div className="loginWrapper">
        <img src={logo} alt="Logo testHero" />
        <form className="loginBox" onSubmit={handleLogin}>
          <p className="texto">Correo</p>
          <input
            placeholder="Correo"
            type="email"
            className="loginInput"
            onChange={(e) => handleEmailChange(e.target.value)}
            value={email}
            required
          />
          <p className="texto">Contraseña</p>
          <input
            placeholder="Contraseña"
            type="password"
            className="loginInput"
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={password}
            required
            minLength="8"
          />
          {status !== "Login exitoso." && (
            <p className="textoError">{status}</p>
          )}
          <button className="loginButton">Ingresar</button>
        </form>
      </div>
    </div>
  );
}
