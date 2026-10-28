"use client"

import PinList from "@/components/PinList";
import Pin from "@/components/Pin";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Footer from "@/components/Footer"
import Header from '@/components/Header';
import Button from "@/components/Button";

export default function PrincipalPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    let id_user = parseInt(searchParams.get("id_user"))
    console.log("id user: " + id_user)


    function clickPin(idPin) {
        router.push("/pin?idpin=" + idPin + "&user=" + id_user)
    }
      
    function nuevoPin(){
        router.push("/subirpin?user="+id_user)
    }

    return (
        <>
            <Header></Header>

            <h1>FEED</h1>

            <Button funcion={nuevoPin} texto={"Nuevo pin"}></Button>
            <br></br>

            <PinList id_log={id_user} botonOnClick={clickPin}></PinList>
            <Footer> </Footer>
        </>
    )
}