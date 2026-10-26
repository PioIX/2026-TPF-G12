"use client"
import styles from "./footer.module.css";
export default function Footer({ }) {
    return(
        <div>
            <footer className={styles.footer}></footer>

            <h3>Integrantes</h3>
            <p>Sayuri Balbin, Liz Contrera, Mauricio Gianotti, Juan Bautista Sallaberry</p>
            <h3>Curso</h3>
            <p> 5toB</p>
        </div>
    )
}