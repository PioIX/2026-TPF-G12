"use client"

import Button from "./Button";
import styles from "./Chatitem.module.css";
import clsx from "clsx";

export default function ChatItem({id, idfunc, foto, nombre, onClick, esFlex}) {


    
    return (
        <div>
            <img className={styles.Imagen} src={foto}></img>
            <h5>{nombre}</h5>
            <div className={styles.conversarUsuario}>
                <Button funcion={onClick} texto={"Conversar con este usuario"}></Button>

            </div>


        </div>
    );
}