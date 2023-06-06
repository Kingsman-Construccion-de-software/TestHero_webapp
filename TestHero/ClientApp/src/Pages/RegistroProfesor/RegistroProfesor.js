import React from "react";
import styles from "./registroProfesor.module.css";
import logo from "../../assets/logo.png";
import BackArrow from "../../assets/BackArrow.png";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import swal from "sweetalert";
/**
 * @author Bernardo de la Sierra
 * @version 1.0.0
 * @license Gp
 * @params Sin parametros
 * @description Clase para registrar al profesor
 */

export default function RegistroProfesor() {
  // Parametros a actualizar
  const [nombre, setNombre] = useState("");
  const [profesor, setProfesor] = useState();
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  /**Cambia el nombre */
  const handleNombreChange = (value) => {
    setNombre(value);
  };
  /**Cambia el nombre */
  const handleApellidoChange = (value) => {
    setApellido(value);
  };
  /**Cambia el correo */
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  /**Cambia la contraseña */
  const handlePasswordChange = (value) => {
    setPassword(value);
    if (value.length < 8) {
      setErrorMessage("");
    } else if (
      !value.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,64}$/
      )
    ) {
      setErrorMessage(
        "La contraseña debe contener al menos una letra, un número y un símbolo"
      );
    } else {
      setErrorMessage("");
    }
  };

  const handleBlur = () => {
    if (
      password.length >= 8 &&
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,64}$/
      )
    ) {
      setErrorMessage(
        "La contraseña debe contener al menos una letra, un número y un símbolo"
      );
    }
  };
  /**Confirmar la contraseña */
  const handleConfirmarChange = (value) => {
    setConfirmar(value);
  };
  /** Hace el inicar sesion */
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      Nombre: nombre,
      Apellido: apellido,
      Correo: email,
      Password: password,
    };
    getProfesor();
    if (profesor.filter((profe) => profe.correo === email).length > 0) {
      swal({
        title: "El correo ya existe en la base de datos",
        button: "Aceptar",
        icon: "error",
      });
    } else {
      if (password === confirmar) {
        try {
          const url = "api/profesor ";
          const result = await axios.post(url, data);
        } catch (error) {
          console.log(error);
        }
        setStatus("Registro exitoso");
        swal({
          title:
            "Se ha registrado con éxito el usuario, regresando a iniciar sesión",
          button: "Aceptar",
          icon: "success",
        });
      } else {
        swal({
          title: "La contraseña y la confirmación no coinciden",
          button: "Aceptar",
          icon: "error",
        });
      }
    }
  };
  const getProfesor = async (e) => {
    try {
      const url = "api/profesor ";
      const result = await axios.get(url);
      setProfesor(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "Registro exitoso") {
      navigate("/login/profesor");
    }
  }, [status]);

  useEffect(() => {
    getProfesor();
  }, []);
  // función para hacer el boton de regreso
  function GoBack() {
    navigate("/login/profesor");
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
        <form className={styles["loginBox"]} onSubmit={handleRegister}>
          <p className={styles["texto"]}>Nombre(s)</p>
          <input
            placeholder="Nombre(s)"
            type="text"
            className={styles["loginInput"]}
            onChange={(e) => handleNombreChange(e.target.value)}
            value={nombre}
            required
          />
          <p className={styles["texto"]}>Apellido(s)</p>
          <input
            placeholder="Apellido(s)"
            type="text"
            className={styles["loginInput"]}
            onChange={(e) => handleApellidoChange(e.target.value)}
            value={apellido}
            required
          />
          <p className={styles["texto"]}>Correo</p>
          <input
            placeholder="Correo"
            type="email"
            className={styles["loginInput"]}
            onChange={(e) => handleEmailChange(e.target.value)}
            value={email}
            required
          />
          <div className="row">
            <div className="col-6">
              <p className={styles["texto"]}>Contraseña</p>

              <input
                placeholder="Contraseña"
                type="password"
                size="18"
                className={styles["loginInput"]}
                onChange={(e) => handlePasswordChange(e.target.value)}
                value={password}
                required
                minLength="8"
                maxLength="64"
                onBlur={handleBlur}
              />
            </div>
            <div className="col-6">
              <p className={styles["texto"]}>Confirmar</p>
              <input
                placeholder="Confirma la contraseña"
                type="password"
                size="18"
                className={styles["loginInput"]}
                onChange={(e) => handleConfirmarChange(e.target.value)}
                value={confirmar}
                required
                minLength="8"
              />
            </div>
          </div>
          <div className="col-12">
            {errorMessage && (
              <p className={`${styles["errorMessage"]} }`}>{errorMessage}</p>
            )}
          </div>
          <button className={styles["loginButton"]}>Registrate</button>
        </form>
      </div>
    </div>
  );
}
