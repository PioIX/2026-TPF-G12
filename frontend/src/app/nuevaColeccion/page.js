"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const API = "http://localhost:4000"

export default function NuevaColeccion() {
    const router = useRouter()
    const idColeccion = useSearchParams().get("id")
    const editando = idColeccion !== null

    const [nombre, setNombre] = useState("")
    const [pins, setPins] = useState([])
    const [usuarios, setUsuarios] = useState([])

    const [pinAColocar, setPinAColocar] = useState("")
    const [pinAQuitar, setPinAQuitar] = useState("")
    const [usuarioAColocar, setUsuarioAColocar] = useState("")
    const [usuarioAQuitar, setUsuarioAQuitar] = useState("")

    useEffect(() => {
        if (!editando) return
        fetch(`${API}/coleccion/${idColeccion}`)
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setNombre(data.nombre)
                    setPins(data.pins)
                    setUsuarios(data.usuarios)
                } else {
                    alert(data.mensaje)
                }
            })
    }, [idColeccion])

    function colocarPin() {
        const id = Number(pinAColocar)
        if (!pinAColocar.trim() || isNaN(id)) return alert("Ingresá un ID de foto válido")
        if (pins.includes(id)) return alert("Esa foto ya está en la colección")
        setPins([...pins, id])
        setPinAColocar("")
    }

    function quitarPin() {
        const id = Number(pinAQuitar)
        if (!pins.includes(id)) return alert("Esa foto no está en la colección")
        setPins(pins.filter(p => p !== id))
        setPinAQuitar("")
    }

    function colocarUsuario() {
        const u = usuarioAColocar.trim()
        if (!u) return
        if (usuarios.includes(u)) return alert("Ese usuario ya tiene acceso")
        setUsuarios([...usuarios, u])
        setUsuarioAColocar("")
    }

    function quitarUsuario() {
        const u = usuarioAQuitar.trim()
        if (!usuarios.includes(u)) return alert("Ese usuario no tiene acceso")
        setUsuarios(usuarios.filter(x => x !== u))
        setUsuarioAQuitar("")
    }

    async function guardar() {
        if (!nombre.trim()) return alert("La colección necesita un nombre")

        const url = editando ? `${API}/coleccioneditar` : `${API}/coleccionnueva`
        const resultado = await fetch(url, {
            method: editando ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_coleccion: editando ? Number(idColeccion) : undefined,
                nombre: nombre.trim(),
                pins,
                usuarios,
            }),
        })
        const data = await resultado.json()

        alert(data.mensaje)
        if (data.ok) router.back()
    }

    return (
        <div>
            {   }
            {editando ? (
                <h1>Editar Colección “{nombre}”</h1>
            ) : (
                <h1>Nueva Colección</h1>
            )}

            {/* El nombre solo se va a escribir cuando este se cree (espero) */}
            {!editando && (
                <input
                    placeholder="Nombre de la colección"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            )}

            <div>
                <input placeholder="ID foto" value={pinAColocar} onChange={e => setPinAColocar(e.target.value)} />
                <button onClick={colocarPin}>Colocar</button>
            </div>
            <div>
                <input placeholder="ID foto" value={pinAQuitar} onChange={e => setPinAQuitar(e.target.value)} />
                <button onClick={quitarPin}>Quitar</button>
            </div>

            <div>
                <input placeholder="nombre usuario" value={usuarioAColocar} onChange={e => setUsuarioAColocar(e.target.value)} />
                <button onClick={colocarUsuario}>Colocar</button>
            </div>
            <div>
                <input placeholder="nombre usuario" value={usuarioAQuitar} onChange={e => setUsuarioAQuitar(e.target.value)} />
                <button onClick={quitarUsuario}>Quitar</button>
            </div>

            <div>
                <p>{editando ? "IDs hasta ahora:" : "Fotos hasta ahora:"}</p>
                <p>{pins.length > 0 ? pins.join(", ") : "—"}</p>
            </div>

            <div>
                <p>Usuarios con acceso:</p>
                <p>{usuarios.length > 0 ? usuarios.join(", ") : "—"}</p>
            </div>

            <button onClick={guardar}>{editando ? "Editar" : "Crear"}</button>
            <button onClick={() => router.back()}>Volver</button>
        </div>
    )
}