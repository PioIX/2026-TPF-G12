"use client"
import Button from "@/components/Button";
import styles from "./header.module.css";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


export default function Header({ }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    let id_user = parseInt(searchParams.get("id_user"))
    let A = parseInt(searchParams.get("A"))


    function cerrarSesion() {
        let cerrar = confirm("Desea cerrar la sesión?")
        if (cerrar) {
            console.log("ANTES id user: " + id_user)
            id_user = -1
            console.log("AHORA (-1) id user: " + id_user)
            router.push("/")
        }
    }

    function irColeccion() {
        router.push("/vercolecciones?id_user="+id_user+"&A="+A)
    }

    function irBuscador() {
        router.push("/buscador?id_user="+id_user+"&A="+A)
    }

    function irAdmin(){
        router.push("/admin?id_user="+id_user+"&A="+A)
    }

    function condicionAdmin(){
        if (A==1){
            return(
                <Button funcion={irAdmin} texto="Admin"></Button>
            )
        }
    }


    return (
        <div className={styles.header}>
            <img src="/PionterestLogo.png"></img>
            <Button funcion={irBuscador} texto="🔎 Buscador"></Button>
            <Button funcion={irColeccion} texto="Mis Colecciones"></Button>

            {condicionAdmin()}

            <Button funcion={cerrarSesion} texto="Cerrar sesión"></Button>
        </div>


    )

}
