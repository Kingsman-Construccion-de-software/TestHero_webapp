import React from "react";
import "./login.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useEffect, useContext } from "react";
import {useNavigate} from "react-router-dom";
import ProfesorContext from "context/contextoProfesor";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const {state, setState } = useContext(ProfesorContext);
  const navigate = useNavigate();

  const handleEmailChange = (value) => {

      setEmail(value);

  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      "Correo": email,
      "Password": password,
    };

    const url = "api/login";

    axios
      .post(url, data)
      .then((result) => {
          console.log(result.data);
          setStatus(result.data.message);
          if(result.data.message === "Login exitoso"){
            getProfesor(result.data.id);
          }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getProfesor = (id) => {
    const url = `api/profesor/${id}`;

    axios
      .get(url)
      .then((result) => {
          let res = result.data[0];
          let profesor = {
            id: res.idProfesor,
            nombre: res.nombre + " " + res.apellido,
            correo: res.correo
          }
          setState(profesor);
      })
      .catch((error) => {
        alert(error);
      });
  }


  useEffect(() => {
    if(status === "Login exitoso"){
      navigate("/home");
    }
  }, [status]);


  return (
    <div className="login">
      <div className="loginWrapper">
        <img src={logo} alt="Logo testHero" />
        <form className="loginBox" onSubmit={handleLogin}>
          <p class="texto">Correo</p>
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
            {status !== "Login exitoso." &&
            <p className="textoError">{status}</p>
            }
            <button className="loginButton">
                Ingresar
            </button>
          </form>
      </div>
    </div>
  );
}