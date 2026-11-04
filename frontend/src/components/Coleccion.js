"use client"
import Button from "@/components/Button";

export default function Coleccion({ nombre, usuarios, funcion1, funcion2, funcion3 }) {
    return (
        <div>
            <p>{nombre}</p>
            <p>Usuarios: {usuarios}</p>
            <Button funcion={funcion1} texto="Editar"></Button>
            <Button funcion={funcion2} texto="Borrar"></Button>
            <Button funcion={funcion3} texto="Ver"></Button>

        </div>
    );
}
