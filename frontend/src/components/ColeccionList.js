"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Coleccion from "./Coleccion";

export default function ColeccionList({ funcion1, funcion2, funcion3}) {
    const [colecciones, setColecciones] = useState([]);
    const [nombres, setNombres] = useState([])
    const [loading, setLoading] = useState(1)
    const searchParams = useSearchParams()

    let id_user = parseInt(searchParams.get("id_user"))

    useEffect(() => {
        if(colecciones.length==0&&loading){

            fetch('http://localhost:4000/getColeccionesDeUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_usuario: id_user })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Datos colecciones de usuario', data);
                    if (data.ok == 1) { }
                    else {
                        data.map((d, i) => {
                            fetch('http://localhost:4000/getMiembrosDeColeccion', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ id_coleccion: d.id_coleccion })
                            })
                                .then(response => response.json())
                                .then(members => {
                                    console.log('Miembros coleccion ind de usuario', members);

                                    setColecciones((prev)=>([...prev,{nombre_coleccion:d.nombre_coleccion,id_coleccion:d.id_coleccion,nombres:members}]))
                                });
                        })
                    }
                });
        }
    }, [])

    useEffect(() => {
        console.log("colecciones cambiadas un saludo")
        console.log(colecciones)
        if(colecciones.length>0){
            console.log("falso loading")
            setLoading(0)
        }
    }, [colecciones])


    return (
        <>
            {loading?
            <p>cargando.....</p>
            :
            colecciones.length == 0 ? (
                <p>no hay nada tonto</p>
            ) : (
                <>
               { colecciones.map((col, i) => {
                    return (
                        <Coleccion key={i} nombre={col.nombre_coleccion} usuarios={col.nombres} funcion1={() => funcion1(col.id_coleccion)} funcion2={() => funcion2(col.id_coleccion)} funcion3={() => funcion3(col.id_coleccion)}  >
                        </Coleccion>
                    )
                })}
                </>
                
            )
            }

        </>
    );
}
