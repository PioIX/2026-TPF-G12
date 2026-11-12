"use client"
export default function Input({id, texto, funcion}) {
    return (
        <input id={id} placeholder={texto} type="text" onChange={funcion}></input>
    )
}