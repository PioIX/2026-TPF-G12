"use client"

import PinList from "@/components/PinList";
import Pin from "@/components/Pin";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";

export default function PrincipalPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    let id_user = parseInt(searchParams.get("id_user"))
    console.log("id user: " + id_user)


    function clickPin(idPin) {
        router.push("/pin?idpin="+idPin) // +"&user="+id_user
    }

    function cerrarSesion() {
        let cerrar = confirm("Desea cerrar la sesión?")
        if (cerrar) {
            id_user = -1
            console.log("id user: " + id_user)
            router.push("/")
        }
    }

    function nuevoPin(){
        router.push("/subirpin?user="+id_user)
    }

    function irAConversaciones(){
        router.push("/conversaciones?user="+id_user)
    }

    return (
        <>
            <h1>FEED</h1>

            <Button funcion={cerrarSesion} texto={"Cerrar Sesión"}></Button>

            <Button funcion={nuevoPin} texto={"Nuevo pin"}></Button>
            <br></br>
            <Button funcion={irAConversaciones} texto={"ir a chats"}></Button>

            <PinList id_log={id_user} botonOnClick={clickPin}></PinList>
        </>
    )
}