"use client"

import { useEffect, useState } from "react";
import Coleccion from "./Coleccion";

export default function ColeccionList({}) {

    const [colecciones, setColecciones] = useState([]);

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
        });

    },[])
    
    return (
        <>
           {colecciones.map((col, i) => {
                return(
                    <Coleccion key={i} nombre={col.nombre_coleccion} me_gusta={col.usuarios}>
                    </Coleccion>
                )
           })} 
        </>
    );
}

// en getColecciones
//falta obtener los usuarios q tienen la coleccion