"use client"
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Coleccion({ nombre, usuarios }) {
    const router = useRouter()

    function irEditar() {
        router.push("/modcoleccion?id_coleccion="+id_coleccion)
    }

    function borrarColeccion() {
        let borrar = confirm("¿Desea borrar la colección?")
        if (borrar) {
            console.log("Se borró la colección")
        }
    }


//     async function borrarPalabras() {
//     let id_pregunta = document.getElementById("select-preguntas").value
//     const resultado = await fetch("http://localhost:4000/borrarpalabrasdepregunta", {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id_pregunta: id_pregunta })
//     })
//     console.log(resultado)
//     if (resultado.ok == true) {
//         return true
//     }
// }


    return (
        <div>
            <p>{nombre}</p>
            <p>Usuarios: {usuarios}</p>
            <Button funcion={irEditar} texto="Editar"></Button>
            <Button funcion={borrarColeccion} texto="Borrar"></Button>
        </div>
    );
}

//acá solo hago lo de editar y borrar