"use client"

import {useSocket} from "@/hooks/useSocket";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";

export default function PinPage() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const user = 1//parseInt(searchParams.get("user"))
    const idPin = parseInt(searchParams.get("idpin"))
    const [descripcion, setDescripcion] = useState("")
    const [link, setLink] = useState("")
    const [tag1, setTag1] = useState("")
    const [tag2, setTag2] = useState("")
    const [meGusta, setMeGusta] = useState(0)
    const [idUsuario, setIdUsuario] = useState(0)
    const [nombreUsuario, setNombreUsuario] = useState("")

    useEffect(() => {
        fetch('http://localhost:4000/getpinespec', {
    
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_pin: idPin})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos', data.pin);
            setDescripcion(data.pin[0].descripcion);
            setLink(data.pin[0].link)
            setTag1(data.pin[0].tag1)
            setTag2(data.pin[0].tag2)
            setMeGusta(data.pin[0].me_gusta)
            setIdUsuario(data.pin[0].id_usuario)
        });

    },[])

    useEffect(() => {
        fetch('http://localhost:4000/getnombreuser', {
    
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_usuario: idUsuario})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos', data.nombre);
            setNombreUsuario(data.nombre[0].nombre);
        });
    },[idUsuario])

    function darLike() {
        setMeGusta(meGusta + 1)

        fetch('http://localhost:4000/getnombreuser', {
    
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_usuario: idUsuario})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos', data.nombre);
            setNombreUsuario(data.nombre[0].nombre);
        });

    }
        

        

    return (
        <>
            <h1>Pin de {nombreUsuario} (id: {idUsuario}) </h1>

            <img src={link}></img>

            <p>Descripción: {descripcion}</p>

            {tag1 == "" ? (
                 <p>Tags: {tag2}</p>
            ):(
                tag2 == "" ? (
                    <p>Tags: {tag1}</p>
                ) : (
                    <p>Tags: {tag1}, {tag2}</p>
                )
            )
            }

            <h4>Likes: {meGusta} </h4>
           
           <Button funcion={darLike} texto={"darle Me Gusta"}></Button>
             
        </>
    )
}
