"use client"

import coleccion from "@/components/coleccion";
import { useEffect } from "react"
import { useState } from "react"

export default function nuevaColeccion() {

    function nombreColeccion(){
        const nombreColeccion = document.getElementById("nombre").value
    }

    function agregarPin() {
        const agregarPin = (id_pin, datosActualizados) => {
            fetch(`http://localhost:3000/agregarpin/${id_pin}`, {
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
        let borrar = confirm("¿Desea borrar la colección?")
        if (borrar) {
            const resultado = fetch("http://localhost:4000/deletepin", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_pin: id_pin })
            })
            console.log(resultado)
            
            console.log("Se borró la colección")
        }
    }

    }

    function agregarUsuario() {
        const agregarUsuario = (id_pin, datosActualizados) => {
            fetch(`http://localhost:3000/nuevacoleccion/${id_pin}`, {
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
        let borrar = confirm("¿Desea borrar la colección?")
        if (borrar) {
            const resultado = fetch("http://localhost:4000/deletecoleccion", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_pin: id_pin })
            })
            console.log(resultado)
            
            console.log("Se borró la colección")
        }
    }
    }

    

    return (
        <div>
            {hola ? (
                <div>
                <h1> Nueva Coleccion 100% Epica y Hermosa donde todo el mundo le va a gustar</h1>

                <input > Nombre de la Coleccion </input>

                <p>------------------------------------</p>

                <input>ID Foto</input>
                <button onClick={agregarPin}>Colocar</button>

                <input>ID Foto</input>
                <button onClick={eliminarPin}>Quitar</button>

                <input>Nombre usuario</input>
                <button onClick={agregarUsuario}>Colocar</button>

                <input>Nombre usuario</input>
                <button onClick={quitarUsuario}>Quitar</button>

                <button onClick={}>Crear</button>



            </div>
            ) : (
            <div>   
                <h1>    </h1>

                <p>------------------------------------</p>

                <input>ID Foto</input>
                <button onClick={agregarPin}>Colocar</button>

                <input>ID Foto</input>
                <button onClick={eliminarPin}>Quitar</button>

                <input>Nombre usuario</input>
                <button onClick={agregarUsuario}>Colocae</button>

                <input>Nombre usuario</input>
                <button onClick={eliminarUsuario}>Quitar</button>

                <button onClick={}>Editar</button>
            </div>
            )}
        </div>
    )
}}