"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Coleccion from "@/components/Coleccion"

const API = "http://localhost:4000"

export default function MisColecciones() {
    const router = useRouter()
    const [colecciones, setColecciones] = useState([])

    async function traerColecciones() {
        const id_usuario = localStorage.getItem("id_usuario")

        const res = await fetch(`${API}/miscolecciones/${id_usuario}`)
        const data = await res.json()
        setColecciones(data)
    }

    useEffect(() => {
        traerColecciones()
    }, [])

    async function borrarColeccion(id_coleccion) {
        if (!confirm("Quiere borrar la colección?")) return

        const res = await fetch(`${API}/coleccionborrar`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_coleccion }),
        })
        const data = await res.json()

        alert(data.mensaje)
        if (data.ok) traerColecciones()
    }

    return (
        <div>
            <h1>Mis colecciones</h1>

            {colecciones.map(c => (
                <Coleccion
                    key={c.id_coleccion}
                    id_coleccion={c.id_coleccion}
                    nombre={c.nombre}
                    usuarios={c.usuarios}
                    onBorrar={borrarColeccion}
                />
            ))}

            <button onClick={() => router.push("/nuevaColeccion")}>+</button>
        </div>
    )
}