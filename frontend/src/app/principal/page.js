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
    const id_user = 2//parseInt(searchParams.get("id_user"))

    function clickPin(idPin) {
        console.log(idPin)
        router.push("/pin?id="+idPin)
    }

    function nuevoPin(){
        router.push("/subirpin?user="+id_user)
    }

    function cerrarSesion(){
        
    }

    return (
        <>
            <h1>FEED</h1>

            <Button funcion={cerrarSesion} texto={"Cerrar Sesión"}></Button>

            <Button funcion={nuevoPin} texto={"Nuevo pin"}></Button>
            <br></br>

            <PinList id_log={id_user} botonOnClick={clickPin}></PinList>
        </>
    )
}