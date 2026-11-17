"use client"

export default function Button({funcion, texto, className = ''}){
    return (
        <button onClick={funcion} className={className}> {texto} </button>
    )
}