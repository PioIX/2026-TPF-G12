"use client"
import styles from './Pin.module.css';
import { useState } from 'react';
export default function Pin({ link, me_gusta, onclick }) {
    const [corazonLleno, setCorazonLleno] = useState(false);

    return (
        <div className={styles.pin}>
            <img src={link} className={styles.imagenPin}></img>
            <div className={styles.contenido}>

                <span
                    className={styles.corazon}
                    onClick={() => setCorazonLleno(!corazonLleno)}
                >
                    {corazonLleno ? '❤️' : '🤍'}
                </span>


                <p>{me_gusta}</p>
                <button onClick={onclick}>Ir al pin</button>
            </div>
        </div>
    );
}