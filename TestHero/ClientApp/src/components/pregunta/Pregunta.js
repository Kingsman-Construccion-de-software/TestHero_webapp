import React from "react";
import "./Pregunta.css";
import {FaArrowDown, FaEdit} from "react-icons/fa"
import {MdCancel} from "react-icons/md"
import { useState } from "react";


export default function Pregunta() {

  const [open, setOpen] = useState(false);
  const [showing, setSbowing] = useState(false);


  const toggleOpen = () => {
    setOpen(!open);
  }

  const timeOutOpen = () => {
    setSbowing(!showing);
    if(open){
        setTimeout(toggleOpen, 1000);
    } else {
        toggleOpen();
    }
  }
  
  return (
    <div className="pregunta">
        <div className="dropdown">
            <p className="titulo">Coseno de 180°</p>
            <div class="pregIcon" onClick={timeOutOpen}>
                <FaArrowDown size={40}/>
            </div>
        </div>  
        {open &&
            <div className={showing ? "extension showing" : "extension hiding"}>
                <form className="respuestas">
                    <div className="respuesta">
                        <input type="radio" name="opciónPregunta1" value="opción1"/>
                        <p>Opción 1</p>
                    </div>
                    <div className="respuesta" value="opción2">
                        <input type="radio" name="opciónPregunta1"/>
                        <p>Opción 2</p>
                    </div>
                    <div className="respuesta" value="opción3">
                        <input type="radio" name="opciónPregunta1" />
                        <p>Opción 3</p>
                    </div>
                    <div className="respuesta" value="opción4">
                        <input type="radio" name="opciónPregunta1"/>
                        <p>Opción 4</p>
                    </div>
                </form>
                <div className="iconsRespuesta">
                    <div className="crudIcon">
                        <FaEdit size={35}/>
                    </div>
                    <div className="crudIcon">
                        <MdCancel size={35}/>
                    </div>
                </div>
            </div>
        }
    </div>      
  );
}
