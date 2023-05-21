import { useState } from 'react'

// Estilos
import styles from './selectable-navbar.module.css'
import useGetSelectedTitle from './hooks/useGetSelectedTitle'

export default function SelectableNavbar({ titles, getSelectedTitle }) {
    const [selectedTitle, setSelectedTitle] = useState(titles[0])
    useGetSelectedTitle(selectedTitle, getSelectedTitle)

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {
                    titles.map(title => (
                        <li
                            className={
                                styles['item-container'] +
                                (selectedTitle === title ? ` ${styles['active-item']}` : '')
                            }
                        >
                            <button onClick={() => setSelectedTitle(title)}>{title}</button>   
                        </li>
                    ))
                }
            </ul>
            <div className={styles['aux-container']}></div>
        </div>
    )
}
