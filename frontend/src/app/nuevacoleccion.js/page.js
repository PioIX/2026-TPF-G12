"use client"

import coleccion from "@/components/coleccion";
import { useEffect } from "react"
import { useState } from "react"

export default function nuevaColeccion() {

    function agregarPin() {
        const agregarPin = (id, datosActualizados) => {
            fetch(`http://localhost:3000/nuevacoleccion/${id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosActualizados)
                })
                .then(response => response.json())
                .then(data => console.log('Coleccion actualizado:', data));
    }

    function quitarPin() {
        const eliminarPin = (id) => {
            fetch(`http://localhost:3000/nuevacoleccion/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
            if (response.ok) {
        setPin(pin.filter(e => e.id !== id));
        }
});
};
    }

    function agregarUsuario() {
        const agregarUsuario = (id, datosActualizados) => {
            fetch(`http://localhost:3000/nuevacoleccion/${id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosActualizados)
                })
                .then(response => response.json())
                .then(data => console.log('Coleccion actualizado:', data));
};
    }

    function quitarUsuario() {
        const eliminarUsuario = (id) => {
            fetch(`http://localhost:3000/nuevacoleccion/${id}`, {
                method: 'DELETE'
                })
                .then(response => {
                if (response.ok) {
                // Remover de la lista local
                setColeccion(coleccion.filter(e => e.id !== id));
}  
});
};
    }

    return (
        <div>
            {hola ? (
                <div>
                <h1> Nueva Coleccion !00% Epica y Hermosa donde todo el mundo le va a gustar</h1>

                <input> Nombre de la Coleccion</input>

                <p>------------------------------------</p>

                <input>ID Foto</input>
                <button onClick={agregarPin}>Colocar</button>

                <input>ID Foto</input>
                <button onClick={eliminarPin}>Quitar</button>

                <input>Nombre usuario</input>
                <button onClick={agregarUsuario}>Colocar</button>

                <input>Nombre usuario</input>
                <button onClick={quitarUsuario}>Quitar</button>

                <button>Crear</button>



            </div>
            ) : (
            <div>   
                <input>Nombre de la Coleccion</input>

                <p>------------------------------------</p>

                <input>ID Foto</input>
                <button onClick={agregarPin}>Colocar</button>

                <input>ID Foto</input>
                <button onClick={eliminarPin}>Quitar</button>

                <input>Nombre usuario</input>
                <button onClick={agregarUsuario}>Colocae</button>

                <input>Nombre usuario</input>
                <button onClick={eliminarUsuario}>Quitar</button>

                <button>Editar</button>
            </div>
            )}
        </div>
    )
}}