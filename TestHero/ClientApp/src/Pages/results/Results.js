import styles from "./results.module.css"
import Sidebar from "../../components/sidebar/Sidebar"

// Icons
import userIcon from "../../assets/UserIcon.png"

export default function Results() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <h1>Grupo WWW</h1>
            <div className={styles.header}>
                <input
                    className={styles['search-bar']}
                    type="search"
                    placeholder="Buscar"
                />
            </div>
            <ul className={styles.table}>
                <li className={styles.row + ' ' + styles['row-colored']}>
                    <span>Foto</span>
                    <span>Nombre(s)</span>
                    <span>Apellido(s)</span>
                    <span>Calificación</span>
                </li>
                {
                    new Array(5).fill(0).map((el, idx) => (
                        <li className={styles.row + `${idx % 2 !== 0 ? ` ${styles['row-colored']}` : ''}`}>
                            <img src={userIcon} alt="foto" />
                            <span>Manuel</span>
                            <span>Florez</span>
                            <span>9</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
