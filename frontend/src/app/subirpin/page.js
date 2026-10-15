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
    const user = parseInt(searchParams.get("user"))
    const [descripcion, setDescripcion] = useState("")
    const [link, setLink] = useState("")
    const [tag1, setTag1] = useState("")
    const [tag2, setTag2] = useState("")
    

    function volver(){
        router.back()
    }

    function postPin(){
        console.log(tag1)
    }

    

    return(
        <>
            <h1>Nuevo Pin</h1>
            <Button funcion={volver} texto={"Volver"}></Button>
            <br></br>
            <SelectTemas nombre={"tag1"} onChange={(select) => setTag1(select.target.value)}></SelectTemas>
            <SelectTemas nombre={"tag2"}></SelectTemas>

            <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="link de la imagen"></input>
            <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="descripcion"></input>
            <br></br>
            <Button funcion={postPin} texto={"Subir"}></Button>
        </>
    )
}