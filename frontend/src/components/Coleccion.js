"use client"
import Button from "@/components/Button";
import { useEffect, useState } from "react";

export default function Coleccion({ nombre, usuarios, funcion1, funcion2, funcion3 }) {

    const [usuariosTexto, setUsuariosTexto] = useState("")

    useEffect(()=>{
        let aux = "";

        for (let i = 0; i < usuarios.length; i++) {
            const usuario = usuarios[i];
            
            aux += usuario.nombre
            if (i < (usuarios.length-1) ) {
                aux += ", "
            }
        }
        setUsuariosTexto(aux)
    }, [usuarios])

    return (
        <div>
            <p>{nombre}</p>
            <p>Usuarios: {usuariosTexto} </p>
            
            <Button funcion={funcion1} texto="Editar"></Button>
            <Button funcion={funcion2} texto="Borrar"></Button>
            <Button funcion={funcion3} texto="Ver"></Button>

        </div>
    );
}
