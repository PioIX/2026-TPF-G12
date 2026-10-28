"use client"
import Button from "@/components/Button";

export default function Header({ funcion1, funcion2}) {
    return (
        <div>
            <img src="/PionterestLogo.png"></img>
            <input></input>
            <Button funcion={funcion1} texto="Mis Colecciones"></Button>

            <Button funcion={funcion2} texto="Cerrar sesión"></Button>
        </div>


    )

}
