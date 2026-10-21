"use client"

import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import SelectTemas from "@/components/SelectTemas";


export default function SubirPinPage(){
    const router = useRouter()
    const searchParams = useSearchParams()
    const user = 1//parseInt(searchParams.get("user"))
    const [descripcion, setDescripcion] = useState("")
    const [link, setLink] = useState("")
    const [tag1, setTag1] = useState("")
    const [tag2, setTag2] = useState("")
    const [subido, setSubido] = useState(false)
    

    function volver(){
        router.back()
    }

    function postPin(){

        const cuerpo = {
            link: link,
            tag1: tag1,
            tag2: tag2,
            descripcion: descripcion,
            id_usuario: user
        }


        fetch('http://localhost:4000/pinnuevo', {
    
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuerpo)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos', data);
            if (data.ok == true) {
                setSubido(true)
            } else {
                console.log("error")
            }
        });

    }
    

    

    return(
        <>
            <h1>Nuevo Pin</h1>
            <Button funcion={volver} texto={"Volver"}></Button>
            <br></br>
            <SelectTemas nombre={"tag1"} onchangefunc={(select) =>  setTag1(select.target.value)}></SelectTemas>
            <SelectTemas nombre={"tag2"} onchangefunc={(select) => setTag2(select.target.value)}></SelectTemas>

            <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="link de la imagen"></input>
            <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="descripcion"></input>
            <br></br>
            

            {
                tag1==tag2 ? (
                    <p><b>¡Cuidado! Las etiquetas no pueden ser iguales</b></p>
                ) : (

                    link == ""? (
                        <p><b>¡El link está vacío!</b></p>
                    ) : (
                        subido ? (
                            <p><b>¡Subido! Fijate los pines</b></p>
                        ) : (
                            <Button funcion={postPin} texto={"Subir"}></Button>
                        )
                    )
                )
            }

        </>
    )
}