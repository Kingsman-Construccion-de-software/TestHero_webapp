import React from "react";
import "./login.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
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

    const url = "login";

    axios
      .post(url, data)
      .then((result) => {
          setStatus(result.data);
      })
      .catch((error) => {
        alert(error);
      });
  };


  useEffect(() => {
    if(status === "Login exitoso."){
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