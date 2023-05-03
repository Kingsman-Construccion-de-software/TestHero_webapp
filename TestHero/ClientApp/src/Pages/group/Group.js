import styles from "Pages/group/group.module.css"

// Components
import Sidebar from "components/sidebar/Sidebar"

export default function Group() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <h1>Grupo WWW</h1>
            <div className={styles['exams-list-header-container']}>
                <h2>Mis examenes</h2>
                <input
                    className={styles['search-bar']}
                    type="search"
                    placeholder="Buscar"
                />
            </div>
            <ul className={styles['exams-list']}>
                <li className={styles['exam-list-item']}>
                    <a href="#">Trigonometría</a>
                </li>
                <li className={styles['exam-list-item']}>
                    <a href="#">Sistemas de ecuaciones</a>
                </li>
                <li className={styles['exam-list-item']}>
                    <a href="#">Geometría</a>
                </li>
                <li className={styles['exam-list-item']}>
                    <a href="#">Estadística</a>
                </li>
            </ul>
        </div>
    )
}
