import styles from "./questions.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Pregunta from "../../components/pregunta/Pregunta"

export default function Questions() {
    return (
      <div>
        <div>
            <Sidebar />
        </div>
        <div className="page">
            <div className="content">
                <h1 className="tituloExamen">Examen de trigonometría</h1> 
                <div className="subtitles">
                    <h2>Preguntas</h2>
                    <h2>Código: 13467942</h2>
                </div>          
            <Pregunta/>  
            </div>
        </div>
    </div>
    )
}