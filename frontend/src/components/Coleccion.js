"use client"

import { useRouter } from "next/navigation"

export default function Coleccion({ id_coleccion, nombre, usuarios, onBorrar }) {
    const router = useRouter()

    return (
        <div>
            <h2>{nombre}</h2>
            <h3>Usuarios:</h3>
            <p>{usuarios.join(", ")}</p>

            <button onClick={() => router.push("/nuevaColeccion?id=" + id_coleccion)}>Editar</button>
            <button onClick={() => onBorrar(id_coleccion)}>Borrar</button>
        </div>
    )
}

