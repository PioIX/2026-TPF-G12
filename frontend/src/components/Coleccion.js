"use client"
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Coleccion({ nombre, usuarios }) {
    const router = useRouter()

    function irEditar() {
        router.push("/modcoleccion")
    }

    function borrarColeccion() {
        let borrar = confirm("¿Desea borrar la colección?")
        if (borrar) {
            console.log("Se borró la colección")
        }
    }


    return (
        <div>
            <p>{nombre}</p>
            <p>Usuarios: {usuarios}</p>
            <Button funcion={irEditar} texto="Editar"></Button>
            <Button funcion={borrarColeccion} texto="Borrar"></Button>
        </div>
    );
}