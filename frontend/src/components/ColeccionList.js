"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Coleccion from "./Coleccion";

export default function ColeccionList({ funcion1, funcion2, funcion3 }) {
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
            body: JSON.stringify({id_usuario: id_user})
        })
            .then(response => response.json())
            .then(data => {
                console.log('Datos', data);
                setColecciones(data[0].colecciones);
                setNombres(data[1])
            });

    }, [])



    return (
        <>
            {colecciones.length == 0 ? (
                    <p>no hay nada tonto</p>
                ) : (
                    colecciones.map((col, i) => {
                        return (
                            <Coleccion key={i} nombre={col.nombre_coleccion} usuarios={nombres} funcion1={funcion1} funcion2={funcion2} funcion3={funcion3}>
                            </Coleccion>
                        )
                    })
                )
            }

        </>
    );
}

//falta obtener los usuarios q tienen la coleccion

// ver si editar y borrar van en coleccLIST o colecc
// ver como mostrar todos los nombres de los usuarios de la coleccion

// en deletecoleccion (backend) ver si tiene sentido lo de los res1,2,3


