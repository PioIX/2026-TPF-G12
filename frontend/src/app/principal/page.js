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
import styles from './page.module.css';


export default function PrincipalPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    let id_user = parseInt(searchParams.get("id_user"))
    let A = parseInt(searchParams.get("A"))

    console.log("id user: " + id_user)


    function clickPin(idPin) {
        router.push("/pin?idpin="+idPin+"&A="+A)
    }
      
    function nuevoPin(){
        router.push("/subirpin?user="+id_user+"&A="+A)
    }

    function irAConversaciones(){
        router.push("/conversaciones?user="+id_user+"&A="+A)
    }

    return (
        <>
            <Header></Header>

            <main className={styles.contenido}>

                <h2 className={styles.titulo}>Publicaciones</h2>
    
    
                <div className={styles.botonesSuperiores}>
                    <Button funcion={nuevoPin} texto={"Nuevo pin"} className={styles.botonAgregar}></Button>
                    <br></br>
                    <Button funcion={irAConversaciones} texto={"ir a chats"}></Button>
                </div>

                <div className={styles.pins}>
                    <PinList id_log={id_user} botonOnClick={clickPin}></PinList>
                </div>
                {/* <div className={styles.pinlist}> <PinList id_log={id_user} botonOnClick={clickPin}></PinList></div> */}
            </main>


            <Footer> </Footer>
        </>
    )
}