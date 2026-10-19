"use client"

import styles from "./colecciones.css"
import { useState } from "react";

export default function colecciones() {

const [coleccion, setColeccion] = useState(false)











return (
    <div>
    {coleccion ? (
        <> 

        <P>soy farfadox y estas son mis farlands</P>

       

        </>
    ):(
        <>
            <div>

                <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH6HV6kZHk-dS5dAH6v_ZJ1olPc7Ff8dGdyKo4OArRwJkN_EJxFURkrQE&s=10" alt = "hola"/>

                <h2>Nombre de la coleccion</h2>

                <p>numero de imagenes</p>

                <button>Hola manola</button>

                <button>Hola manolo</button>

            </div>
        



        </>
         )}
    </div>

        //crear un componente que se pueda repetir, en forma de cuadrado, donde se pueda repetir/agregar a la pagina cada vez que el usuario crear un coleccion nueva.
    );
}