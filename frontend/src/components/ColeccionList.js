"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Coleccion from "./Coleccion";

export default function ColeccionList({ }) {
    const [colecciones, setColecciones] = useState([]);
    const router = useRouter()


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

    }, [])

    function irEditar() {
        router.push("/modcoleccion?id_coleccion=" + id_coleccion)
    }

    function borrarColeccion() {
        let borrar = confirm("¿Desea borrar la colección?")
        if (borrar) {
            const resultado = fetch("http://localhost:4000/deletecoleccion", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_coleccion: id_coleccion })
            })
            console.log(resultado)
            
            console.log("Se borró la colección")
        }
    }




    return (
        <>
            {colecciones.map((col, i) => {
                return (
                    <Coleccion key={i} nombre={col.nombre_coleccion} usuarios={col.nombre} funcion1={irEditar} funcion2={borrarColeccion}>
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