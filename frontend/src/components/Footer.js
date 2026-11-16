"use client"
import styles from "./footer.module.css";
export default function Footer({ }) {
    return (
        <div>
            <footer className={styles.footer}>
                <div className={styles.seccionIzquierda}>
                    <h3 className={styles.titulo}>Integrantes</h3>
                    <p className={styles.texto}>Sayuri Balbin, Liz Contrera, Mauricio Gianotti, Juan Bautista Sallaberry</p>
                </div>
                <div className={styles.seccionDerecha}>
                    <h3 className={styles.titulo}>Curso</h3>
                    <p className={styles.texto}>5toB</p>
                </div>
            </footer>
        </div>
    )
}