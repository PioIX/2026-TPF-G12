"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Coleccion from "./Coleccion";

export default function ColeccionList({ funcion1, funcion2}) {
    const [colecciones, setColecciones] = useState([]);
    const [id_coleccion, setId_coleccion] = useState("")

    useEffect(() => {
        fetch('http://localhost:4000/getColecciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Datos', data);
                setColecciones(data.colecciones);
                setId_coleccion(data.id_coleccion)

            });

    }, [])



    return (
        <>
            {colecciones.map((col, i) => {
                return (
                    <Coleccion key={i} nombre={col.nombre_coleccion} funcion1={funcion1} funcion2={funcion2} funcion3={funcion3}>
                    </Coleccion>
                )
            })}
        </>
    );
}

//falta obtener los usuarios q tienen la coleccion 

// ver si editar y borrar van en coleccLIST o colecc 
// ver como mostrar todos los nombres de los usuarios de la coleccion

// en deletecoleccion (backend) ver si tiene sentido lo de los res1,2,3