"use client"

export default function Button({funcion, texto}){
    return(
    <button onClick={funcion}>{texto}</button>
    )
}