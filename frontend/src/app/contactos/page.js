"use client"




import ChatList from "@/components/ChatList";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ContactosPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id_user = 2//parseInt(searchParams.get("id_user"))

    function clickChat(idChat) {
        console.log(idChat)
        console.log("usuario "+id_user)
        router.push("/mensajes?conv="+idChat+"&user="+id_user)
    }

    return (
        <>
            <h1>Contactos</h1>

            <ChatList id_log={id_user} botonOnClick={clickChat}></ChatList>
        </>
    )
}