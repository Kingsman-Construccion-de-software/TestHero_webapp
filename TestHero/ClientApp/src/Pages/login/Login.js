import React from "react";
import "./login.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import axios from "axios";
/**
 * @author: Bernardo de la Sierra
 * @license: GP
 * @version: 2.0.0
 * Esta clase esta dedica al login
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (value) => {
      setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogin = (e) => {

    e.preventDefault()

    const data = {
      "Correo": email,
      "Password": password,
    };

    const url = "login";

    axios
      .post(url, data)
      .then((result) => {
        alert(result.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          <div class="imagen">
            <img src={logo} alt="Logo testHero" />
                  </div>
                  <form className="loginBox" onSubmit={handleLogin}>
            {/* onSubmit={handleClick} */}
            <p class="texto">Correo</p>
            <input
              placeholder="Correo"
              type="email"
              className="loginInput"
              onChange={(e) => handleEmailChange(e.target.value)}
              value={email}
              required
            />
            <p class="texto">Contraseña</p>
            <input
              placeholder="Contraseña"
              type="password"
              className="loginInput"
              onChange={(e) => handlePasswordChange(e.target.value)}
              value={password}
              required
              minLength="8"
            />
            <button className="loginButton">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
