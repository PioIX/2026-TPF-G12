"use client"
import styles from "./Button.module.css";
export default function Button({ funcion, texto, className = '' }) {
    return (
            <button onClick={funcion} className={`${styles.button} $ {className}`}> {texto} </button>

    )
}