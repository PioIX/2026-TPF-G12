"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Coleccion from "./Coleccion";

export default function ColeccionList({ funcion1, funcion2, funcion3}) {
    const [colecciones, setColecciones] = useState([]);
    const [nombres, setNombres] = useState([])
    const searchParams = useSearchParams()

    let id_user = parseInt(searchParams.get("id_user"))

    useEffect(() => {
        fetch('http://localhost:4000/getcoleccionespagina', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: id_user })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Datos coleccionlist', data);
                console.log("data [0].nombres[0].nombre: " + data[0].nombres[0].nombre)
                if (data.ok == 1) {}
                else{
                    setColecciones(data[0].colecciones);
                    if (data[0].nombres[1].id_coleccion == data[0].colecciones[1].id_coleccion)
                    setNombres(data[0].nombres)}
            });
    }, [])



    return (
        <>
            {colecciones.length == 0 ? (
                <p>no hay nada tonto</p>
            ) : (
                colecciones.map((col, i) => {
                    return (
                        <Coleccion key={i} nombre={col.nombre_coleccion} usuarios={nombres} funcion1={() => funcion1(col.id_coleccion)} funcion2={() => funcion2(col.id_coleccion)} funcion3={() => funcion3(col.id_coleccion)}  >
                        </Coleccion>
                    )
                })
            )
            }

        </>
    );
}
