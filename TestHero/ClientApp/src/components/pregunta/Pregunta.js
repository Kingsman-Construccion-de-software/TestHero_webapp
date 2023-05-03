import React from "react";
import "./Pregunta.css";
import {FaArrowDown} from "react-icons/fa"

export default function Pregunta() {
  return (
    <div>
        <div className="dropdown">
            <p className="titulo">Coseno de 180°</p>
            <div class="pregIcon">
                <FaArrowDown size={40}/>
            </div>
        </div>  
        <div className="extension">
            <div className="respuesta">
                <input type="radio"/>
                <p>Opción 1</p>
            </div>
            <div className="respuesta">
                <input type="radio"/>
                <p>Opción 2</p>
            </div>
            <div className="respuesta">
                <input type="radio"/>
                <p>Opción 3</p>
            </div>
            <div className="respuesta">
                <input type="radio"/>
                <p>Opción 4</p>
            </div>
        </div>
    </div>      
  );
}
