"use client"


import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";

import Chatlist from "@/components/Chatlist";
import styles from "./conversaciones.module.css";
export default function ConversacionesPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    let id_user = parseInt(searchParams.get("user"))
    console.log("id user: " + id_user)


    function irAChat(idChat) {
        router.push("/chat?user=" + id_user + "&sala=" + idChat)
    }

    function volver() {
        router.back()
    }


    return (
        <div className={styles.conversacionesPagina}>
            <div className={styles.conversacionesContenido}>
                <div className={styles.conversacionesEncabezado}>
                    <h1 className={styles.conversacionesTitulo}>Conversaciones</h1>
                    <div className={styles.conversacionesBotonVolver}>
                        <Button funcion={volver} texto={"Volver"} />
                    </div>
                </div>
                <div className={styles.conversacionesLista}>
                    <Chatlist id_log={id_user} botonOnClick={irAChat} />
                </div>
            </div>
        </div>
    )
        
    
}