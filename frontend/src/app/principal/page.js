"use client"




import PinList from "@/components/PinList";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id_user = 2//parseInt(searchParams.get("id_user"))

    function clickChat(idPin) {
        console.log(idPin)
        router.push("/pin?id="+idPin)
    }

    return (
        <>
            <h1>Contactos</h1>

            <PinList id_log={id_user} botonOnClick={clickChat}></PinList>
        </>
    )
}