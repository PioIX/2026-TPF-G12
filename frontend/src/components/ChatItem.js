"use client"

import Button from "./Button";
import styles from "./Chatitem.module.css";
// import clsx from "clsx";

export default function ChatItem({ id, idfunc, foto, nombre, onClick, esFlex }) {



    return (
        <div className={styles.conversarUsuario}>
            <div className={styles.tarjetaPerfil}>
                <img className={styles.Imagen} src={foto} alt={nombre} />
            </div>
            <h5 className={styles.nombre}>{nombre}</h5>
            <div  className={styles.botonConversar}> 
            <Button funcion={onClick} texto="Conversar" />
            </div>
        </div>

    );
}