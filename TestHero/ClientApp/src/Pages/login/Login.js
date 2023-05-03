import React from "react";
import "./login.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import axios from "axios";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

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

  return (
    <div className="login">
      <div className="loginWrapper">
          <div>
            <img src={logo} alt="Logo testHero" />
          </div>
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
            <p className="textoError">{status}</p>
            <button className="loginButton">
                Ingresar
            </button>
          </form>
      </div>
    </div>
  );
}
