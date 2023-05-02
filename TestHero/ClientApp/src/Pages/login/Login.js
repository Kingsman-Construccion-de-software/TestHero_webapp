import React, { useRef } from "react";
import "./login.css";
import logo from "../../assets/logo.png";
// import { loginCall } from "../../apiCalls";
// import { AuthContext } from "../../context/AuthContext";
// import CircularProgress from "@mui/material/CircularProgress";

/**
 * @author: Bernardo de la Sierra
 * @license: GP
 * @version: 1.0.0
 * Esta clase esta dedica al login
 */
export default function Login() {
  const nombre = useRef();
  const password = useRef();
  //   const { usuario, isFetching, error, dispatch } = useContext(AuthContext);

  //   const handleClick = (e) => {
  //     e.preventDefault();
  //     loginCall(
  //       { nombre: nombre.current.value, password: password.current.value },
  //       dispatch
  //     );
  //   };

  // console.log(usuario);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          <div class="imagen">
            <img src={logo} alt="Logo testHero" />
          </div>
          <form className="loginBox">
            {/* onSubmit={handleClick} */}
            <p class="texto">Usuario</p>
            <input
              placeholder="Nombre de usuario"
              type="nombre"
              className="loginInput"
              ref={nombre}
              required
            />
            <p class="texto">Contraseña</p>
            <input
              placeholder="Contraseña"
              type="password"
              className="loginInput"
              ref={password}
              required
              minLength="6"
            />
            <button className="loginButton" type="submit">
              {/* disabled={isFetching} */}
              {/* <CircularProgress color="secondary" size="20px" /> */}
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
