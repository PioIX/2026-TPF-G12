"use client"
import Button from "@/components/Button";
import { useRouter } from "next/navigation";


export default function Header({}) {
    const router = useRouter()

    function cerrarSesion() {
        let cerrar = confirm("Desea cerrar la sesión?")
        if (cerrar) {
            id_user = -1
            console.log("id user: " + id_user)
            router.push("/")
        }
    }

    function irColeccion() {
        router.push("/vercolecciones")
    }


    return (
        <div>
            <img src="/PionterestLogo.png"></img>
            <input></input>
            <Button funcion={irColeccion} texto="Mis Colecciones"></Button>

            <Button funcion={cerrarSesion} texto="Cerrar sesión"></Button>
        </div>


    )

}
